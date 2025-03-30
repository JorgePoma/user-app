import { Controller, Logger, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagingService } from './messaging.service';
import { UserMSG } from 'src/common/constants';
import { Types } from 'mongoose';
import { ExceptionFilter } from 'src/common/filters/rpc-exception.filter';

@UseFilters(new ExceptionFilter())
@Controller()
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @MessagePattern(UserMSG.VALIDATE_USER)
  validateUser(@Payload() body: Types.ObjectId) {
    Logger.log(body, 'Validando usuario');
    return this.messagingService.validateUser(body);
  }

}
