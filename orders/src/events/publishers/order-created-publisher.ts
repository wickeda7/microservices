import { Publisher, OrderCreatedEvent, Subjects } from "@wickedracing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
