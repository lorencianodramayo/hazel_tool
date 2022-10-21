import { addData, getData } from "../../utils/connector";

export const getLanguage = () => getData("/LanguageAPI/getLanguage");

export const addLanguage = (param) => addData("/LanguageAPI/addLanguage", param);