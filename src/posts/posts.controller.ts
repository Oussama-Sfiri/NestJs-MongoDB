import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/CreatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  createPost(@Body() postDetails: CreatePostDto) {
    return this.postsService.createPost(postDetails)
  }

}
