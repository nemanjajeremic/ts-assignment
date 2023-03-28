import axios from "axios";
import { expect } from "chai";
import { sendRequest } from "./utility.js";
import testData from "../request-data.json" assert { type: "json" };

describe("Verify PUT endpoint", function () {
  afterEach(async function () {
    await sendRequest(testData.put.delete);
  });

  after(async function () {
    let responseX = await sendRequest(testData.get.positive);
    let getCurrentArraySizeX = await responseX.data.length;
    for (let index = 0; index < getCurrentArraySizeX; index++) {
      await axios.request({
        method: "delete",
        maxBodyLength: "Infinity",
        url: "https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api",
        headers: { "Content-Type": "application/json" },
        data: {
          main_key: `${responseX.data[index]["main_key"]}`,
        },
      });
    }
  });

  it("Verify that put returns 200 and OK", async function () {
    let response = await sendRequest(testData.put.positive);

    expect(
      response.status,
      "Return status was not 200, you have an error"
    ).to.equal(200);
    expect(response.statusText).to.equal("OK");
  });

  it("Verify that put returns right content-type", async function () {
    let response = await sendRequest(testData.put.positive);

    expect(
      response.headers["content-type"],
      "Content-type was not as expected"
    ).to.equal("application/json");
  });

  it("Verify that put returns added resource", async function () {
    let response = await sendRequest(testData.put.positive);

    expect(response.data).to.deep.equal(testData.put.positive.data);
  });

  it("Verify that put request adds a resource", async function () {
    let response = await sendRequest(testData.get.positive);
    let getCurrentArraySize = await response.data.length;
    // add a resource
    await sendRequest(testData.put.positive);
    // check new size
    response = await axios.request(testData.get.positive);

    let getNewArraySize = await response.data.length;
    expect(
      getNewArraySize,
      "Your back-end did not accept new resource, the amount of resources stayed the same"
    ).to.equal(getCurrentArraySize + 1);
  });

  it("Verify that put replaces existing resource", async function () {
    let response = await sendRequest(testData.get.positive);

    await sendRequest(testData.put.positive);
    //replace a resource using PUT
    response = await sendRequest(testData.get.positive);

    let result = response.data.find((item) => item.main_key === "w");
    expect(result).to.deep.equal(testData.put.replace.data);
  });

  it.only("Verify error if quota is excedeed", async function () {
    let response = await sendRequest(testData.get.positive);
    let getCurrentArraySize = await response.data.length;
    let max = 10;
    for (let index = getCurrentArraySize; index < max; index++) {
      try {
        await axios.request(testData.put.quota[index]);
        // check new size
        response = await axios.request(testData.get.positive);
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.statusText).to.equal("Bad Request");
        expect(error.response.data).to.equal("you reached your quta");
      }
    }
  });

  it("Verify error if you try to create a resource with PUT without value", async function () {
    let response;
    try {
      response = await axios.request(testData.put.invalidValue);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal("Bad Request");
      expect(error.response.data).to.equal("'value'");
    }
  });

  it("Verify error if you try to create a resource with PUT without main_key", async function () {
    let response;
    try {
      response = await axios.request(testData.put.invalidMainkey);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal("Bad Request");
      expect(error.response.data).to.equal("'main_key'");
    }
  });

  it("Verify error if you try to PUT with existing value", async function () {
    let response;
    await sendRequest(testData.put.positive);
    try {
      response = await axios.request(testData.put.positive);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal("Bad Request");
      expect(error.response.data).to.equal("value already exist");
    }
  });
});
