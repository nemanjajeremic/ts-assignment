import axios from "axios";
import { expect } from "chai";
import { sendRequest } from "./utility.js";
import testData from "../request-data.json" assert { type: "json" };
import { beforeEach } from "mocha";

describe("Team Sava", function () {
  describe("Verify DELETE endpoint", function () {
    //TODO wrap axios in try/catch

    beforeEach(async function () {
      await sendRequest(testData.delete.toBeDeleted);
    });
    after(async function () {
      await sendRequest(testData.delete.positive);
    });
    // TODO create a resource to be deleted
    it("Verify that DELETE returns 200 and OK", async function () {
      const response = await sendRequest(testData.delete.positive);
      expect(response.status, "Status is not 200").to.equal(200);
      expect(response.statusText, "Status text is not OK").to.equal("OK");
    });

    it("Verify that DELETE returns deleted resource", async function () {
      const response = await sendRequest(testData.delete.positive);

      expect(response.data, "Does not contain key").to.contain.keys([
        "main_key",
      ]);
    });

    it("Verify that delete request deletes a resource", async function () {
      // get current size
      let response = await sendRequest(testData.get.positive);
      let getCurrentArraySize = await response.data.length;
      // add a resource
      await sendRequest(testData.delete.positive);

      // check new size
      response = await sendRequest(testData.get.positive);
      let getNewArraySize = await response.data.length;
      expect(
        getNewArraySize,
        "Your back-end did not delete the resource, the amount of resources stayed the same"
      ).to.equal(getCurrentArraySize - 1);
    });

    //negative
    it("Verify that error is thrown while trying to delete non-existing resource", async function () {
      let response = await axios.request(testData.delete.negative);
      expect(response.status, "Status code is wrong").to.equal(400);
      expect(response.statusText, "Status text is wrong").to.equal(
        "Bad request"
      );
    });
  });
});