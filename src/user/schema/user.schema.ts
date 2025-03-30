import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
/**
 * User schema
 * 
 * @Description User schema for MongoDB
 * 
 * @param name - User's name
 * @param email - User's email
 * @param password - User's password
 * @param role - User's role
 * @param createdAt - User's creation date
 * @param updatedAt - User's update date
 */
@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, required: true, unique: true })
    email: string;
    @Prop({ type: String, required: true })
    password: string;
    @Prop({ type: String, required: true })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
