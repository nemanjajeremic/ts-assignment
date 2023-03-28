import axios from "axios";
import { expect } from "chai";
import { sendRequest } from "./utility.js";
import testData from "../request-data.json" assert { type: "json" };

describe("Team Sava", function () {
  describe("Verify GET endpoint", function () {
    it("Verify that GET returns 200 and OK", async function () {
      const response = await sendRequest(testData.get.positive);

      expect(response.status, "Status is not 200").to.equal(200);
      expect(response.statusText, "Status text is not OK").to.equal("OK");
      //we can assert all in one it block, or separate each assertion
      // expect(response.data, "Something than array was returned").to.be.a(
      //   "array"
      // );
      // expect(
      //   response.headers["content-type"],
      //   "This has wrong content-type"
      // ).to.equal("application/json");
      // expect(arraySize, "Array has no values").to.be.at.least(1);
      // expect(arraySize, "Array size is more than 10!").to.be.at.most(10);
    });

    it("Verify that GET returns type array", async function () {
      const response = await sendRequest(testData.get.positive);
      expect(response.data, "Something than array was returned").to.be.a(
        "array"
      );
    });

    it("Verify that GET returns right content-type", async function () {
      const response = await sendRequest(testData.get.positive);
      expect(
        response.headers["content-type"],
        "This has wrong content-type"
      ).to.equal("application/json");
    });

    it("Verify that GET returns non-empty array", async function () {
      const response = await sendRequest(testData.get.positive);
      const arraySize = await response.data.length;
      expect(arraySize, "Array has no values").to.be.at.least(1);
    });

    it("Verify that GET returns max 10 resources", async function () {
      const response = await sendRequest(testData.get.positive);
      const arraySize = await response.data.length;
      expect(arraySize, "Array size is more than 10!").to.be.at.most(10);
    });
  });
});
