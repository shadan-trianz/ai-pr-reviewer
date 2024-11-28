import { Request, Response } from "express";
import {
  getPrReviewService,
  getPrStatusService,
  reviewPrService,
} from "../services/pr.service";

export const reviewPr = async (req: Request, res: Response): Promise<any> => {
  const { url } = req.params;
  const result = await reviewPrService(url);
  return res.status(200).json(result);
};

export const getStatus = async (req: Request, res: Response): Promise<any> => {
  const { prid } = req.params;
  const result = await getPrStatusService(prid);
  return res.status(200).json(result);
};

export const getResult = async (req: Request, res: Response): Promise<any> => {
  const { prid } = req.params;
  const result = await getPrReviewService(prid);
  return res.status(200).json(result);
};
