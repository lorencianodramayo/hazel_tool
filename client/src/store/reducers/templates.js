import { createSlice } from "@reduxjs/toolkit";

import {
    getPartnerId,
    getTemplates,
    getTemplateSelected,
} from "../../services/api/Adlib/adlib";

import { 
    setTemplate, 
    setBucket, 
    setGeneration 
} from "../../services/api/Adlib/template";

const initialState = {
    brief: {
        data: {},
        fetching: false,
        error: null,
    },
    template: {
        data: {},
        fetching: false,
        error: null,
    },
    isSaving: false,
    isGenerate: false,
    isBucket: false,
};

const templates = createSlice({
    name: "templates",
    initialState,
    reducers: {
        initBrief: (state) => {
            state.brief.fetching = true;
            state.brief.error = null;
        },
        initSaving: (state) => {
            state.isSaving = true;
        },
        initGenerate: (state) => {
            state.isGenerate = true;
        },
        initBucket: (state) => {
            state.isBucket = true;
        },
        initTemplate: (state) => {
            state.template.fetching = true;
            state.template.error = null;
        },
        briefSuccess: (state, { payload }) => {
            state.brief.data = payload;
            state.brief.fetching = false;
            state.brief.error = null;
        },
        templateSuccess: (state, { payload }) => {
            state.template.data = payload;
            state.template.fetching = false;
            state.template.error = null;
        },
        briefError: (state, { payload }) => {
            state.brief.fetching = false;
            state.brief.error = { message: payload };
        },
        templateError: (state, { payload }) => {
            state.template.fetching = false;
            state.template.error = { message: payload };
        },
        resetAll: (state) => {
            state.brief.data = {};
            state.brief.fetching = false;
            state.brief.error = null;
            state.template.data = {};
            state.template.fetching = false;
            state.template.error = null;
            state.isBucket = false;
            state.isGenerate = false;
            state.isSaving = false;
        },
        resetTemplate: (state) => {
            state.template.data = {};
            state.template.fetching = false;
            state.template.error = null;
            state.isBucket = false;
            state.isGenerate = false;
            state.isSaving = false;
        },
    },
});

export const {
    initBrief,
    briefSuccess,
    briefError,
    initTemplate,
    templateSuccess,
    templateError,
    initSaving,
    initGenerate,
    initBucket,
    resetAll,
    resetTemplate,
} = templates.actions;

export const requestBrief = (params) => async (dispatch) => {
    dispatch(initBrief());
    const { status: partnerStatus, data: partnerData } = await getPartnerId({
        platform: params?.split("/")[2]?.split(".")[0],
        conceptId: params?.split("/")[4],
    });

    if (partnerStatus === 200) {
        const { status: templateStatus, data: templateData } = await getTemplates({
            platform: params.split("/")[2].split(".")[0],
            conceptId: params.split("/")[4],
            partnerId: partnerData?.body?.partnerId,
        });

        if (templateStatus === 200) {
            dispatch(briefSuccess(templateData?.body));
        }
    } else {
        dispatch(briefError("Something went wrong when getting partner id."));
    }
};

export const requestTemplates = (params) => async (dispatch) => {
    dispatch(resetTemplate());
    dispatch(initTemplate());
    const { status, data } = await getTemplateSelected(params);

    if (status === 200) {
        dispatch(templateSuccess(data?.body));
    } else {
        dispatch(
            templateError("Something went wrong when getting sepcific template.")
        );
    }
};

export const saveTemplate = (params, navigate) => async (dispatch) => {
    dispatch(initSaving());
    const { status: saveStatus, data: saveData } = await setTemplate({ 
        name: params?.name,
        size: params?.size,
        version: params?.version
    });

    if (saveStatus === 200){
        dispatch(initBucket());
        const { status: bucketStatus, data: bucketData } = await setBucket({
            templateId: saveData?._id,
            templateUrl: params?.template,
        }); 
        console.log(saveData);

        if (bucketStatus === 200){
            dispatch(initGenerate());
            const { status: generationStatus, data: generationData } = await setGeneration({
                templateId: saveData?._id,
                generation: params?.generation,
            });
            console.log(bucketData);
            if (generationStatus === 200) {
                navigate(`/playground/${generationData?.templateId}`);
            }
        }
    }
};

export default templates.reducer;
