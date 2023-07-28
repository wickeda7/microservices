import { Subjects, Publisher, OrderCancelledEvent } from "@wickedracing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
