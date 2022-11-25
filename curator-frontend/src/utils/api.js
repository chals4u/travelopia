import axios from "axios";

export const getQuery = (endpoint) => axios.get(endpoint);
export const patchQuery = (endpoint, data) => axios.patch(endpoint, data);
export const putQuery = (endpoint, data) => axios.put(endpoint, data);
export const postQuery = (endpoint, data) => axios.post(endpoint, data);
export const deleteQuery = (endpoint) => axios.delete(endpoint);
