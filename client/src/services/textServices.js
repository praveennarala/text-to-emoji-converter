import axios from 'axios';
const apiUrl = "http://localhost:4040/api/texts";

export const getTexts = () => {
  return axios.get(apiUrl);
}

export const addText = (text) => {
  return axios.post(apiUrl, text);
}

export function deleteText(id) {
  return axios.delete(apiUrl + "/" + id);
}