import axios from "axios";
import { expect } from "chai";
import { sendRequest } from "./utility.js";
import testData from "../request-data.json" assert { type: "json" };

describe("Team Sava", function () {
  describe("Verify PUT endpoint", function () {
    afterEach(async function () {
      await sendRequest(testData.put.delete);
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
      let getCurrentArraySize = await response.data.length;
      1;
      //add a resource using PUT - total should be equal to getCurrentArraySize
      await sendRequest(testData.put.positive);
      //replace a resource using PUT - total should be equal to getCurrentArraySize
      response = await sendRequest(testData.get.positive);
      let getNewArraySize = await response.data.length;

      expect(
        getNewArraySize,
        "Your back-end did not accept new resource, the amount of resources stayed the same"
      ).to.equal(getCurrentArraySize + 1);
      let result = response.data.find((item) => item.main_key === "w");
      expect(result).to.deep.equal(testData.put.replace.data);
    });

    it("Verify error if quota is excedeed", async function () {
      //TODO set up this
      let response = await sendRequest(testData.get.positive);
      let getCurrentArraySize = await response.data.length;
      // add a resource, should fail
      if (getCurrentArraySize >= 10) {
        try {
          await axios.request(testData.put.positive);
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
        response = await axios.request(testData.put.invalid);
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.statusText).to.equal("Bad Request");
        expect(error.response.data).to.equal("'value'");
      }
    });
  });
});
