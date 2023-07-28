import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@wickedracing/common";
import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";
import ts from "typescript";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    //@ts-ignore
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });
    //@ts-ignore
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
