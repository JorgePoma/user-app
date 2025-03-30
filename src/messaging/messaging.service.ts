import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class MessagingService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(id: Types.ObjectId) {
    const user = await this.userModel.exists({ _id: id });
    if (!user) {
      throw new RpcException("Usuario no encontrado");
    }
    return user;
  }
}
