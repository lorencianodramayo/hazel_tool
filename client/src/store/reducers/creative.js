import { createSlice } from "@reduxjs/toolkit";

import { getCreative, getVariants } from '../../services/api/QATool/creative';

const initialState = {
    creative: {
        data: {},
        fetching: false,
        error: null,
    },
    variations: {
        data: {},
        fetching: false,
        error: null,
    }
};

const creative = createSlice({
    name: "creative",
    initialState,
    reducers: {
        initCreative: (state) => {
            state.creative.fetching = true;
            state.creative.error = null;
        },
        initVariations: (state) => {
            state.variations.fetching = true;
            state.variations.error = null;
        },
        creativeSuccess: (state, { payload }) => {
            state.creative.data = payload;
            state.creative.fetching = false;
            state.creative.error = null;
        },
        creativeError: (state, { payload }) => {
            state.creative.fetching = false;
            state.creative.error = { message: payload };
        },
        variationsSuccess: (state, { payload }) => {
            state.variations.data = payload;
            state.variations.fetching = false;
            state.variations.error = null;
        },
        variationsError: (state, { payload }) => {
            state.variations.fetching = false;
            state.variations.error = { message: payload };
        },
    }
});

export const {
    initCreative,
    creativeSuccess,
    creativeError,
    initVariations,
    variationsSuccess,
    variationsError,
} = creative.actions;

export const requestCreative = (id) => async (dispatch) => {
    dispatch(initCreative());
    const { status: creativeStatus, data: creativeData } = await getCreative(id);

    if (creativeStatus === 200) {
        dispatch(initVariations());
        dispatch(creativeSuccess(creativeData))
        const { status: variantStatus, data: variantData } = await getVariants(id);
        if (variantStatus === 200) {
            dispatch(variationsSuccess(variantData));
        }else{
            dispatch(variationsError("Something went wrong when getting variants."));
        }
    } else {
        dispatch(creativeError("Something went wrong when getting partner id."));
    } 
};

export default creative.reducer;