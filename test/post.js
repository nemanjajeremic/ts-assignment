import axios from "axios";
import { expect } from "chai";
import { sendRequest } from "./utility.js";
import testData from "../request-data.json" assert { type: "json" };

describe("Team Sava", function () {
  describe("Verify POST endpoint", function () {
    after(async function () {
      await sendRequest(testData.post.delete);
    });

    it("Verify that post returns code 200 and status OK", async function () {
      response = await sendRequest(testData.post.positive);

      expect(response.status, "Return code was not 200").to.equal(200);
      expect(response.statusText, "Return status was not OK").to.equal("OK");
    });

    it("Verify that post returns right content-type", async function () {
      const response = await sendRequest(testData.post.positive);

      expect(
        response.headers["content-type"],
        "Content-type was not as expected"
      ).to.equal("application/json");
    });

    it("Verify that post returns added resource", async function () {
      const response = await sendRequest(testData.post.positive);

      expect(response.data).to.deep.equal(testData.post.positive.data);
    });

    it("Verify that resource quota is increased by 1", async function () {
      let getCurrentArraySize;
      let getNewArraySize;
      let response = await sendRequest(testData.post.positive);
      getCurrentArraySize = await response.data.length;
      // add a resource
      if (getCurrentArraySize >= 10) {
        throw Error(
          "Maximum quota of 10 exceeded. Please delete some resources in order to add new resources."
        );
      }
      response = await sendRequest(testData.post.positive);
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
      //add a resource using PUT - total should be equal to getCurrentArraySize
      await sendRequest(testData.put.positive);
      //replace a resource using PUT - total should be equal to getCurrentArraySize
      await sendRequest(testData.post.replace);
      response = await sendRequest(testData.get.positive);
      let getNewArraySize = await response.data.length;

      expect(
        getNewArraySize,
        "Your back-end did not accept new resource, the amount of resources stayed the same"
      ).to.equal(getCurrentArraySize + 1);
      let result = response.data.find((item) => item.main_key === "w");
      expect(result).to.deep.equal(testData.post.replace.data);
    });

    it("Verify that you cannot replace with POST without providing value", async function () {
      await sendRequest(testData.put.positive);
      try {
        response = await axios.request(testData.post.invalid);
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.statusText).to.equal("Bad Request");
        expect(error.response.data).to.equal("'value'");
      }
    });
  });
});
