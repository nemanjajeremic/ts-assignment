import axios from "axios";

export const sendPutRequest = async (config) => {
  let response;
  let request = { method: "put", ...config };
  try {
    response = await axios.request(request);
    return response;
  } catch (error) {
    let errorMessage = `Status code of your error is ${error.response?.status} with message of "${error.response?.statusText}". \n Additional help info contains following message: "${error.response?.data}".`;
    throw Error(errorMessage);
  }
};

export const sendGetRequest = async (config) => {
  let response;
  let request = { method: "get", ...config };
  try {
    response = await axios.request(request);
    return response;
  } catch (error) {
    let errorMessage = `Status code of your error is ${error.response?.status} with message of "${error.response?.statusText}". \n Additional help info contains following message: "${error.response?.data}".`;
    throw Error(errorMessage);
  }
};

export const sendPostRequest = async (config) => {
  let response;
  let request = { method: "post", ...config };
  try {
    response = await axios.request(request);
    return response;
  } catch (error) {
    let errorMessage = `Status code of your error is ${error.response?.status} with message of "${error.response?.statusText}". \n Additional help info contains following message: "${error.response?.data}".`;
    throw Error(errorMessage);
  }
};

export const sendDeleteRequest = async (config) => {
  let response;
  let request = { method: "delete", ...config };
  try {
    response = await axios.request(request);
    return response;
  } catch (error) {
    let errorMessage = `Status code of your error is ${error.response?.status} with message of "${error.response?.statusText}". \n Additional help info contains following message: "${error.response?.data}".`;
    throw Error(errorMessage);
  }
};
