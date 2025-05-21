/* eslint-disable prettier/prettier */
import {     MessageBody, OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage,
  WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {  Server, Socket } from 'socket.io';
import { ConnectedSocket } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { MessageService } from './message.service';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';



@WebSocketGateway({ cors: true })
export class MessageGateway implements OnGatewayConnection , OnGatewayDisconnect {

  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService,
  ) {
  }

  @WebSocketServer() server: Server;
  private readonly logger = new Logger(MessageGateway.name);
  clientIdArray = [];
  allCurrentRooms = [];
  

  handleConnection(client: Socket): void {
    this.server.emit('room', client.id + ' joined!')
    this.logger.log(`Client with ID: ${client.id} is connected!`);
  }

  async handleDisconnect(client: Socket) {
      this.server.emit('room', client.id + ' left!')
      this.logger.log(`Client with ID: ${client.id} is disconnected!`);
      const clientId = this.clientIdArray.find(i => i.client === client.id);
      if(clientId)
      {
        console.log("Removing Client...");
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        this.allCurrentRooms.forEach(function(value) {
          const room = value.name;
          if(self.roomService.checkUserInRoom(room , clientId.id))
          {
            self.roomService.leaveRoom(room , clientId.id);
            self.server.to(room).emit('join_room' , `${clientId.name} has left ${room}!`);
          }
          
        })
        this.clientIdArray.filter(i => i.client !== clientId.client);
      }
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(@ConnectedSocket() client: Socket ,@MessageBody() body : {roomId : string , user : string , userId : string}): Promise<void> {
    console.log("ID is: " + body.userId);
    console.log(`User ${body.user} joined room ${body.roomId}`)
    const roomFound = this.allCurrentRooms.find(i => i.name === body.roomId);
    if(!roomFound)
    {
      this.allCurrentRooms.push({name : body.roomId});
    }
    this.clientIdArray.push({client : client.id , id : body.userId , name : body.user});
    client.join(body.roomId); // Join the room
    this.roomService.joinRoom(body.roomId , body.userId);
    this.server.to(body.roomId).emit('join_room' , `${body.user} has joined ${body.roomId}!`);
  }

    // Leave a room
  @SubscribeMessage('leave_room')
  async handleLeaveRoom(@ConnectedSocket() client: Socket , @MessageBody() body : {roomId : string , user : string , userId : string}): Promise<void> {
    client.leave(body.roomId); // Leave the room
    this.roomService.leaveRoom(body.roomId , body.userId);
    this.server.to(body.roomId).emit('leave_room' , `${body.user} has left room: ${body.roomId}`)
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@ConnectedSocket() client: Socket ,@MessageBody() body : {roomId : string , userId: string , user : string , message: string} ) {
    this.server.to(body.roomId).emit('sendMessage' , body);
    await this.messageService.sendMessage(new Types.ObjectId(body.userId) , body.message ,body.roomId , "group");
  }

  // Get chat history for a room
  @SubscribeMessage('get_chat_history')
  async handleGetHistory(@ConnectedSocket() client: Socket ,@MessageBody() body : {roomName : string}): Promise<void> {
    console.log("Called sub func");
    const messages = await this.messageService.getMessagesByRoomUsingName(body.roomName);
    const users = await this.userService.findAll();
    const messageArray : {sender : string , message : string}[] = [];
    messages.forEach(function(value : any) {
      const userName = users.find(i => i._id.toString() === value.user_id.toString()).name.split(' ')[0]; 
      messageArray.push({sender : userName , message: value.content});
    })
    client.emit('get_chat_history', messageArray);
  }

    /*@SubscribeMessage('customName')
    handleMessage(client: Socket, message: any): void {
        this.client.emit('room', `[${client.id}] -> ${message}`);
    }*/




}
