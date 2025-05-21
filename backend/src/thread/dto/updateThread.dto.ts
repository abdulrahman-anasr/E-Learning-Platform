/* eslint-disable prettier/prettier */

export class UpdateThreadDto {

  thread_id : string;
  threadTitle?: string; // The title of the thread


  content?: string; // The content of the thread

  forum_id?: string;

  createdBy?: string; // The user who created the thread
}
