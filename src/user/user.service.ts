import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll(limit: number, skip: number) {
    return await this.userModel.find()
      .select('-__v -password -updatedAt')
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async findOne(id: Types.ObjectId) {
    return await this.userModel
      .findById(id)
      .select('-__v -password -updatedAt')
      .exec();
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const res = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!res) {
      throw new Error('Usuario no encontrado');
    }
    return {
      message: 'Usuario actualizado',
      user: res._id,
    }
  }

  async remove(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id).exec();
    return { message: 'Usuario eliminado' };
  }
}
