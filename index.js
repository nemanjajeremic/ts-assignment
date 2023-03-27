const axios = require("axios");

get;

let configGet = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
  headers: {},
};

const getData = async () => {
  try {
    const response = axios.request(configGet);
    console.log(JSON.stringify(await response.data));
  } catch (error) {}
};

//delete

let dataDelete = JSON.stringify({
  main_key: "Ericksdss",
});

let configDelete = {
  method: "delete",
  maxBodyLength: Infinity,
  url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
  headers: {
    "Content-Type": "application/json",
  },
  data: dataDelete,
};

axios
  .request(configDelete)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

//put
const axios = require("axios");
let dataPut = JSON.stringify({
  main_key: "w",
  value: "test1",
});

let config = {
  method: "put",
  maxBodyLength: Infinity,
  url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
  headers: {
    "Content-Type": "application/json",
  },
  data: dataPut,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

///post
let data = JSON.stringify({
  main_key: "w",
  value: "xx",
});

let configPost = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

const postData = async () => {
  try {
    const response = await axios.request(configPost);
    console.log(JSON.stringify(await response.data));
  } catch (error) {}
};

postData();
