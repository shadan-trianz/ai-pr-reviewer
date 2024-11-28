import { Router } from "express";
import { getResult, getStatus, reviewPr } from "../controllers/pr.controller";

const router = Router();

router.post("/review/:url", reviewPr);
router.get("/status/:prid", getStatus);
router.get("/result/:prid", getResult);

export default router;
