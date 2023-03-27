// const assert = require("assert");
// const axios = require("axios");
import axios from "axios";
// const exp = require("constants");
// let expect = require("chai").expect;
// import expect from chai;
import { expect } from "chai";
import { sendRequest } from "./utility.js";

describe("Array", function () {
  describe("Verify POST endpoint", function () {
    // data
    let data = JSON.stringify({
      main_key: "w",
      value: "xx",
    });
    // request configs
    let configGet = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
      headers: {},
    };

    let configPost = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // const sendRequest = async (config) => {
    //   try {
    //     const response = await axios.request(config);
    //     return await response;
    //   } catch (error) {}
    // };
    it("Verify that post request works", async function () {
      let getResponse = await sendRequest(configGet);
      let getResponseData = await getResponse.data;
      expect(getResponseData.length).to.equal(5);

      let response = await sendRequest(configPost);
      let responseData = await response.data;
      let responseDataJson = JSON.stringify(responseData);
      let responseStatus = response.status;
      let responseStatusText = response.statusText;
      let responseHeaders = response.headers;
      let contentType = responseHeaders["content-type"];

      expect(contentType).to.equal("application/json");
      expect(responseStatusText).to.equal("OK");
      expect(responseStatus).to.equal(200);
      expect(responseDataJson).to.equal(data);
      let getResponseA = await sendRequest(configGet);
      let getResponseDataA = await getResponseA.data;
      expect(getResponseDataA.length).to.equal(6);
    });
  });
});
