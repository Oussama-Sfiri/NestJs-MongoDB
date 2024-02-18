import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post("create")
    @UsePipes(ValidationPipe)
    createUser(@Body() userDetails: CreateUserDto) {
        console.log(userDetails);
        return this.userService.createUser(userDetails);
    }

    @Get("getAll")
    getAllUsers() {
        return this.userService.getUsers();
    }

    @Get("getById/:id")
    async getUserById(@Param("id") userId: string) {
        // premiermeent il faut verifier que l'id provider par le client est valide çàd est de type ObjectId avant de chercher l'user
        const isValidId = mongoose.Types.ObjectId.isValid(userId);
        if(!isValidId){
            throw new HttpException("the ID provided is not valid => User NOt Found With this ID", 404)
        }else{
            const userFound = await this.userService.getUserById(userId);
            if(!userFound){
                throw new HttpException("The User with the provided ID is Not Found", 404);
            }else{
                return userFound;
            }
        }
    }

    @Patch("update/:id")
    @UsePipes(ValidationPipe)
    async updateUser(@Param("id") userId: string, @Body() userDetails: UpdateUserDto){
        const isValidId = mongoose.Types.ObjectId.isValid(userId);
        if (!isValidId) {
            throw new HttpException("the ID provided is not valid => User to update Not Found With this ID", 404)
        }else{
            const updatedUser = await this.userService.updateUserById(userId, userDetails);
            if(!updatedUser){
                throw new HttpException("User Not Found to Update it",404);
            }else{
                return updatedUser;
            }
        }
    }

    @Delete("delete/:id")
    async deleteUser(@Param("id") userId: string){
        const isValidId = mongoose.Types.ObjectId.isValid(userId);
        if (!isValidId) {
            throw new HttpException("the ID provided is not valid => User to Delete Not Found With this ID", 404)
        }else{
            const deletedUser = await this.userService.deleteUserById(userId);
            if(!deletedUser){
                throw new HttpException("User Not Found to Delete it",404);
            }else{
                return deletedUser;
            }
        }
    }

}
