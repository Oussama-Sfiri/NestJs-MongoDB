import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./UserSettings.schema";
import { Post } from "./Post.schema";

@Schema() // <=> @Entity()
export class User {

    @Prop({ unique: true, required: true }) // <=> @Column()
    username: string;

    @Prop({ required: false })
    displayName?: string; // ?: means that this field is optional it can be undefined because it's not required in the DB

    @Prop({ required: false })
    avatarUrl?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "UserSettings" }) // One-To-One Relationship : This part specifies that the settings property is of type ObjectId, and it is a reference to the "UserSettings" model. type: mongoose.Schema.Types.ObjectId: Indicates that the field will store MongoDB ObjectId values. ref: "UserSettings": Specifies the referenced model. In this case, it's "UserSettings". This establishes a reference or link between the current model and the "UserSettings" model. 
    settings?: UserSettings; // settings: UserSettings;: This declares the settings property with the type UserSettings. Even though the data in the database is stored as ObjectId, Mongoose will automatically populate the settings field with the actual UserSettings document when you query the database.

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] }) // One-To-Many Relationship : { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] }: This part specifies that the posts property is an array of ObjectId values, and each ObjectId is a reference to the "Post" model. type: mongoose.Schema.Types.ObjectId: Indicates that each element in the array will store MongoDB ObjectId values. ref: "Post": Specifies the referenced model. In this case, it's "Post". This establishes a reference or link between the current model and the "Post" model.
    posts: Post[]; // posts: Post[];: This declares the posts property as an array of type Post. Even though the data in the database is stored as an array of ObjectIds, Mongoose will automatically populate the posts array with the actual Post documents when you query the database.
}

export const UserSchema = SchemaFactory.createForClass(User); // This function generates a Mongoose schema from the User class. It takes the User class as an argument and applies the decorators to create the corresponding Mongoose schema.