import axios from "axios";

export const getData = async (url, param) => {
    return await axios.get(url, {params: param});
}

export const addData = async (url, param) => {
    return await axios.post(url, param);
}

export const editData = async (url, param) => {
    return await axios.put(url, param);
}

export const deleteData = async (url, param) => {
    return await axios.delete(url, param);
}