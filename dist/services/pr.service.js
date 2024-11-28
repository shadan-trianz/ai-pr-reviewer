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
exports.reviewPrService = void 0;
const axios_1 = __importDefault(require("axios"));
const reviewPrService = (url) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(url);
    try {
        const apiUrl = "http://localhost:11434/api/generate";
        const data = {
            model: "codegemma",
            prompt: "What are the popular programming languages in 2024?",
            stream: false,
        };
        const response = yield axios_1.default.post(apiUrl, data);
        console.log({ res: response.data.response });
        return response.data.response;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error interacting with the model");
    }
});
exports.reviewPrService = reviewPrService;
