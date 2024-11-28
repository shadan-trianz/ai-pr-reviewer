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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.getStatus = exports.reviewPr = void 0;
const pr_service_1 = require("../services/pr.service");
const reviewPr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.params;
    const result = yield (0, pr_service_1.reviewPrService)(url);
    return res.json(result);
});
exports.reviewPr = reviewPr;
const getStatus = () => {
    console.log("in getStatus");
};
exports.getStatus = getStatus;
const getResult = () => {
};
exports.getResult = getResult;
