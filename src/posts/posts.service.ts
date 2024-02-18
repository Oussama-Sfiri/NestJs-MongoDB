import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post.name) private readonly postsModel: Model<Post>,
                @InjectModel(User.name) private readonly userModel: Model<User>
    ){}

    async createPost(postDetails: CreatePostDto) {
        const {userId, ...postInfos} = postDetails;
        const foundUser = await this.userModel.findById(userId);
        if(!foundUser){
            throw new HttpException("User Not Found", 404);
        }else{
            const newPost = new this.postsModel(postInfos);
            const savedPost = await newPost.save();
            const updatedUser = await foundUser.updateOne({ // or : foundUser.posts.push(savedPost._id)
                $push: { // $push: because it is an array || This is a MongoDB update operator. It is used to append a specified value to an array.
                    posts: savedPost._id
                }
            })
            console.log(updatedUser);
            return savedPost;
        }
    }
    // const newPost = new this.postsModel(postDetails);
    // return newPost.save();
}
