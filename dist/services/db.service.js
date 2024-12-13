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
exports.saveReview = exports.updateStatus = exports.getPrReview = exports.getPrStatus = exports.createPr = void 0;
const pr_model_1 = __importDefault(require("../models/pr.model"));
const createPr = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pr = yield pr_model_1.default.create({
            status: "processing",
        });
        return { prid: pr.dataValues.prid, status: pr.dataValues.status };
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPr = createPr;
const getPrStatus = (prid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pr = yield pr_model_1.default.findOne({ where: { prid: prid } });
        return { prid: pr === null || pr === void 0 ? void 0 : pr.dataValues.prid, status: pr === null || pr === void 0 ? void 0 : pr.dataValues.status };
    }
    catch (error) {
        console.error(error);
        throw new Error("Error in fetching from DB");
    }
});
exports.getPrStatus = getPrStatus;
const getPrReview = (prid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pr = yield pr_model_1.default.findOne({ where: { prid: prid } });
        return {
            prid: pr === null || pr === void 0 ? void 0 : pr.dataValues.prid,
            status: pr === null || pr === void 0 ? void 0 : pr.dataValues.status,
            review: pr === null || pr === void 0 ? void 0 : pr.dataValues.response,
        };
    }
    catch (error) {
        console.error(error);
        throw new Error("Error in fetching from DB");
    }
});
exports.getPrReview = getPrReview;
const updateStatus = (prid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pr = yield pr_model_1.default.findOne({ where: { prid: prid } });
        if (pr) {
            pr.status = "failed";
        }
        yield (pr === null || pr === void 0 ? void 0 : pr.save());
    }
    catch (error) { }
});
exports.updateStatus = updateStatus;
const saveReview = (prid, review) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pr = yield pr_model_1.default.findOne({ where: { prid: prid } });
        if (pr) {
            pr.response = review;
            pr.status = "success";
        }
        yield (pr === null || pr === void 0 ? void 0 : pr.save());
        return true;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error in saving review");
    }
});
exports.saveReview = saveReview;
