"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pr_controller_1 = require("../controllers/pr.controller");
const router = (0, express_1.Router)();
router.post('/review/:url', pr_controller_1.reviewPr);
router.get('/status', pr_controller_1.getStatus);
router.get('/result', pr_controller_1.getResult);
exports.default = router;
