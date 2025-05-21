import { Types } from "mongoose";

export class UpdateReplyDto {

    reply_id : Types.ObjectId;

    content: string; // The content of the thread
  }