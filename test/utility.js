import axios from "axios";

export const sendRequest = async (config) => {
  let response;
  try {
    response = await axios.request(config);
    return response;
  } catch (error) {
    let errorMessage = `Status code of your error is ${error.response?.status} with message of "${error.response?.statusText}". \n Additional help info contains following message: "${error.response?.data}".`;
    throw Error(errorMessage);
  }
};
