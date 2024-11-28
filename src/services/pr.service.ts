import axios from "axios";
import {
  createPr,
  getPrReview,
  getPrStatus,
  saveReview,
  updateStatus,
} from "./db.service";
import { config } from "../config/config";

// Analyses the PR and saves the result in db. Returns the prId for references.
export const reviewPrService = async (url: string) => {
  console.log(url);
  try {
    // Create a record and update its status to - Processing in db
    const pr = await createPr();

    try {
      // Query the LLM and save the result in db
      // If failed, update the status to - Failed, otherwise Processed
      const data = {
        model: "codegemma",
        prompt: `You are a git pull request reviewer. Analyze the given PR and give result only
       if there is any potential bugs, errors or formatting errors. Focus on the code and files provided. 
       Don't focus on missing test cases if not mentioned in the PR. Don't focus on the missing 
       doucmentation. Give the specific code line, wherever improvements are suggested. 
       Don't give any additional comments or notes. The PR link is: ${url}`,
        stream: false,
      };
      const response = await axios.post(config.apiUrl, data);

      // Save the response in db
      if (typeof pr?.prid == "number")
        await saveReview(pr.prid, response.data.response);
    } catch (error) {
      console.error(error);
      if(typeof pr?.prid == "number") updateStatus(pr?.prid);
    }

    return pr;
  } catch (error) {
    console.error(error);
    throw new Error("Error interacting with the model");
  }
};

export const getPrStatusService = async (prid: string) => {
  try {
    const status = await getPrStatus(prid);
    return status;
  } catch (error) {
    console.error(error);
    throw new Error("Error in fetching from DB");
  }
};

export const getPrReviewService = async (prid: string) => {
  try {
    const status = await getPrReview(prid);
    return status;
  } catch (error) {
    console.error(error);
    throw new Error("Error in fetching from DB");
  }
};
