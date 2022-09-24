import { getData } from "../../utils/connector";

export const getTemplates = (param) => getData("/AdlibAPI/templates", param);

export const getPartnerId = (param) => getData("/AdlibAPI", param);

export const getTemplateSelected = (param) => getData("/AdlibAPI/templateSelected", param);