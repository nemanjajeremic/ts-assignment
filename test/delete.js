import axios from "axios";
import { expect } from "chai";
import {
  sendPutRequest,
  sendGetRequest,
  sendDeleteRequest,
} from "./utils/utility.js";
import testData from "../request-data.json" assert { type: "json" };
import { beforeEach } from "mocha";

describe("Verify DELETE endpoint", function () {
  beforeEach(async function () {
    await sendPutRequest(testData.delete.toBeDeleted);
  });
  after(async function () {
    await sendDeleteRequest(testData.delete.positive);
  });
  it("Verify that DELETE returns 200 and OK", async function () {
    const response = await sendDeleteRequest(testData.delete.positive);
    expect(response.status, "Status is not 200").to.equal(200);
    expect(response.statusText, "Status text is not OK").to.equal("OK");
  });

  it("Verify that DELETE returns deleted resource", async function () {
    const response = await sendDeleteRequest(testData.delete.positive);

    expect(response.data, "Does not contain key").to.contain.keys(["main_key"]);
  });

  it("Verify that delete request deletes a resource", async function () {
    // get current size
    let response = await sendGetRequest(testData.get.positive);
    let getCurrentArraySize = await response.data.length;
    // add a resource
    await sendDeleteRequest(testData.delete.positive);

    // check new size
    response = await sendGetRequest(testData.get.positive);
    let getNewArraySize = await response.data.length;
    expect(
      getNewArraySize,
      "Your back-end did not delete the resource, the amount of resources stayed the same"
    ).to.equal(getCurrentArraySize - 1);
  });

  it("Verify that error is thrown while trying to delete non-existing resource", async function () {
    let response = await axios.request(testData.delete.negative);
    expect(response.status, "Status code is wrong").to.equal(400);
    expect(response.statusText, "Status text is wrong").to.equal("Bad request");
  });
});
