import express, { Request, Response } from "express";
import { Order } from "../models/order";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@wickedracing/common";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }
    //@ts-ignore
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    //@ts-ignore
    res.send(order);
  }
);

export { router as showOrderRouter };
