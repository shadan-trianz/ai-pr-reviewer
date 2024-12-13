"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrReviewService = exports.getPrStatusService = exports.fetchPRData = exports.queryLLM = exports.reviewPrService = void 0;
const axios_1 = __importDefault(require("axios"));
const db_service_1 = require("./db.service");
const generative_ai_1 = require("@google/generative-ai");
// Analyses the PR and saves the result in db. Returns the prId for references.
const reviewPrService = (url) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(url);
    let pr;
    try {
        // Create a record and update its status to - Processing in db
        pr = yield (0, db_service_1.createPr)();
        // Get the review from the PR
        const data = yield (0, exports.fetchPRData)(url);
        // Process the review asynchronously
        (0, exports.queryLLM)(data, pr);
        return pr;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error interacting with the model");
    }
});
exports.reviewPrService = reviewPrService;
// Process the review asynchronously
const queryLLM = (data, pr) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("llm running");
        const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            tools: [
                {
                    codeExecution: {},
                },
            ],
        });
        const result = yield model.generateContent(`You are a git pull request reviewer. Analyze the given PR and give result only
    //            if there are any potential bugs, errors, or formatting errors. Focus on the code and files provided.
    //            Don't focus on missing test cases if not mentioned in the PR. Don't focus on the missing
    //            documentation. Give the specific code line, wherever improvements are suggested.
    //            Don't give any additional comments or notes. The PR diff is: ${data}`);
        const response = result.response;
        console.log("\n\n\n gemini res: ", response.text());
        if (typeof (pr === null || pr === void 0 ? void 0 : pr.prid) === "number") {
            yield (0, db_service_1.saveReview)(pr.prid, response.text());
        }
        console.log("llm done");
    }
    catch (error) {
        console.error(error);
        if (typeof (pr === null || pr === void 0 ? void 0 : pr.prid) === "number")
            (0, db_service_1.updateStatus)(pr === null || pr === void 0 ? void 0 : pr.prid);
    }
});
exports.queryLLM = queryLLM;
const fetchPRData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlParts = url.split("/");
        const owner = urlParts[3];
        const repo = urlParts[4];
        const pullNumber = urlParts[6];
        const diffUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;
        const response = yield axios_1.default.get(diffUrl, {
            headers: { Accept: "application/vnd.github.v3.diff" },
        });
        const data = response.data;
        return data;
    }
    catch (error) {
        console.error("Error fetching PR files:", error);
        throw error;
    }
});
exports.fetchPRData = fetchPRData;
const getPrStatusService = (prid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, db_service_1.getPrStatus)(prid);
        return status;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error in fetching from DB");
    }
});
exports.getPrStatusService = getPrStatusService;
const getPrReviewService = (prid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, db_service_1.getPrReview)(prid);
        return status;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error in fetching from DB");
    }
});
exports.getPrReviewService = getPrReviewService;
