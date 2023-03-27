export const sendRequest = async (config) => {
  try {
    const response = await axios.request(config);
    return await response;
  } catch (error) {}
};
