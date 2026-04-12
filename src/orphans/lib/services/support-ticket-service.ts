import { MOCK_SUPPORT_TICKETS, SupportTicket } from "../constants/supportTickets";
import { FIVE_SECONDS, TEN_SECONDS } from "../constants/time.constants";
import { randomDelay } from "./common";

export const listSupportTickets = async (): Promise<Array<SupportTicket>> => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, MOCK_SUPPORT_TICKETS);
}