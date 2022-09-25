import axios from "axios";

export const getData = async (url, param) => {
    return await axios.get(url, { params: param, timeout: 60000 * 2 });
}

export const addData = async (url, param) => {
    return await axios.post(url, param, { timeout: 60000 * 2 });
}

export const editData = async (url, param) => {
    return await axios.put(url, param, { timeout: 60000 * 2 });
}

export const deleteData = async (url, param) => {
    return await axios.delete(url, param, { timeout: 60000 * 2 });
}