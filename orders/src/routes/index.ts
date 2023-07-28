import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { requireAuth } from "@wickedracing/common";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    //@ts-ignore
    userId: req.currentUser!.id,
  }).populate("ticket");
  //@ts-ignore
  res.send(orders);
});

export { router as indexOrderRouter };
