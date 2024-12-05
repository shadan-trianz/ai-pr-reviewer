import axios from "axios";
import {
  createPr,
  getPrReview,
  getPrStatus,
  saveReview,
  updateStatus,
} from "./db.service";
import { config } from "../config/config";
import { GoogleGenerativeAI } from "@google/generative-ai";


// Analyses the PR and saves the result in db. Returns the prId for references.
export const reviewPrService = async (url: string) => {
  console.log(url);
  let pr;

  try {
    // Create a record and update its status to - Processing in db
    pr = await createPr();

    const prFiles = await fetchPRFiles(url);
    // Process the review asynchronously
    queryLLM(prFiles, pr);

    return pr;
  } catch (error) {
    console.error(error);
    throw new Error("Error interacting with the model");
  }
};

// Process the review asynchronously
export const queryLLM = async (prFiles: string, pr: any) => {
  try {
    console.log("running");
    // Query the LLM and save the result in db
    // If failed, update the status to - Failed, otherwise Processed
    // const data = {
    //   model: "codegemma",
    //   prompt: `You are a git pull request reviewer. Analyze the given PR and give result only
    //            if there are any potential bugs, errors, or formatting errors. Focus on the code and files provided. 
    //            Don't focus on missing test cases if not mentioned in the PR. Don't focus on the missing 
    //            documentation. Give the specific code line, wherever improvements are suggested. 
    //            Don't give any additional comments or notes. The PR files are: ${JSON.stringify(prFiles)}`,
    //   stream: false,
    // };
    // const response = await axios.post(config.apiUrl, data);

    // Save the response in db
    // if (typeof pr?.prid === "number") {
    //   await saveReview(pr.prid, response.data.response);
    // }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
    console.log("genAI connected...")
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      tools: [
        {
          codeExecution: {},
        },
      ],
    });
    console.log("model connected...")
    const result = await model.generateContent(
      "Give a function in java to check if a number if even"
    );
    console.log("result connected...", result)
    const response = result.response;
    console.log(response.text());
    console.log("done")
  } catch (error) {
    console.error(error);
    // if (typeof pr?.prid === "number") updateStatus(pr?.prid);
  }
}

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const fetchPRFiles = async (url: string) => {
    const headers = {
        // Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    };
    try {
        const { data } = await axios.get(url, { headers });
        console.log("prdata: ", data)
        return data;
    } catch (error) {
        console.error('Error fetching PR files:', error);
        throw error;
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
