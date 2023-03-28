import axios from "axios";
import { expect } from "chai";
import { sendRequest } from "./utility.js";
import testData from "../request-data.json" assert { type: "json" };

describe("Verify POST endpoint", function () {
  after(async function () {
    await sendRequest(testData.post.delete);
  });

  it("Verify that post returns code 400 and status bad request if value is not in store", async function () {
    let response;
    try {
      response = await axios.request(testData.post.negative);
    } catch (error) {
      expect(error.response.status, "Return code was not 400").to.equal(400);
      expect(
        error.response.statusText,
        "Return code was not 'Bad Request'"
      ).to.equal("Bad Request");
    }
  });

  it("Verify that post returns added resource with proper content-type", async function () {
    await sendRequest(testData.put.positive);

    const response = await sendRequest(testData.post.positive);

    expect(response.data).to.deep.equal(testData.post.positive.data);
    expect(
      response.headers["content-type"],
      "Content-type was not as expected"
    ).to.equal("application/json");
  });

  it("Verify that resource amount is increased by 1 after using POST", async function () {
    let getCurrentArraySize;
    let getNewArraySize;
    let response = await sendRequest(testData.get.positive);
    getCurrentArraySize = await response.data.length;

    response = await sendRequest(testData.get.positive);
    getNewArraySize = await response.data.length;
    expect(
      getNewArraySize,
      "Your back-end did not accept new resource, the amount of resources stayed the same"
    ).to.equal(getCurrentArraySize + 1);
  });

  it("Verify that post errors if you provide non-json data", async function () {
    let response;
    try {
      response = await axios.request(testData.post.negative);
    } catch (error) {
      expect(error.response.status, "Return code was not 400").to.equal(400);
      expect(
        error.response.statusText,
        "Return code was not 'Bad Request'"
      ).to.equal("Bad Request");
    }
  });

  it("Verify that POST replaces existing resource", async function () {
    let response = await sendRequest(testData.get.positive);
    let getCurrentArraySize = await response.data.length;
    await sendRequest(testData.post.replace);
    response = await sendRequest(testData.get.positive);
    let getNewArraySize = await response.data.length;

    expect(
      getNewArraySize,
      "Your back-end did not accept new resource, the amount of resources stayed the same"
    ).to.equal(getCurrentArraySize);
    let result = response.data.find((item) => item.main_key === "w");
    expect(result).to.deep.equal(testData.post.replace.data);
  });

  it("Verify that you cannot replace with POST without providing value", async function () {
    try {
      response = await axios.request(testData.post.invalidValue);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal("Bad Request");
      expect(error.response.data).to.equal("'value'");
    }
  });

  it("Verify that you cannot replace with POST without providing main_key", async function () {
    try {
      response = await axios.request(testData.post.invalidMainkey);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal("Bad Request");
      expect(error.response.data).to.equal("'main_key'");
    }
  });
});
