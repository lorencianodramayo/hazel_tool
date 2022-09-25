import { getData } from "../../utils/connector";

export const getCreative = (param) => getData("/CreativeAPI/getCreative", param);

export const getVariants = (param) => getData("/CreativeAPI/getVariants", param);