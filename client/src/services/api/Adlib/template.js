import { addData } from "../../utils/connector";

export const setTemplate = (param) => addData("/TemplateAPI", param);

export const setBucket = (param) => addData("/TemplateAPI/bucket", param);

export const setGeneration = (param) => addData("/TemplateAPI/generation", param);

