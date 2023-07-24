import { Publisher, Subjects, TicketUpdatedEvent } from "@wickedracing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
