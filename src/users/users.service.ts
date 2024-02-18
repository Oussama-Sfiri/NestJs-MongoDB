import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
                @InjectModel(UserSettings.name) private readonly userSettingsModel: Model<UserSettings>
    ){} // Model <=> Repository / @InjectModel(User.name) => User.name it has to match the name of the model in the forFeature methode in the usersModule

    async createUser(userDetails: CreateUserDto) {
        const { settings, ...userInfos } = userDetails;
        if(settings){ // si l'user a specifier le field de settings
            const newSettings = new this.userSettingsModel(settings);
            const savedNewSettings = await newSettings.save();
            const newUser = new this.userModel({
                ...userInfos,
                settings: savedNewSettings._id
            });
            return newUser.save()
        }else{
            const newUser = new this.userModel(userDetails); // creating our user document ("enregistrement" ou "row") à partir de l'object passer en parametres
            return newUser.save(); // saving this user document ("newUser") in the collection ("table de la BD") this collection will be created automatically wile inserting documents (enregistrements)
        }
        
    }

    getUsers() {
        const allUsers = this.userModel.find().populate(["settings","posts"]);
        return allUsers;
    }

    getUserById(userId: string) {
        const userFound = this.userModel.findById(userId).populate(["settings","posts"]); // populate("settings"): bach lfield dyl settings ikoun kiban lina comme objects bles fields dyalo machoi comme "id" (equivalent à relations: [] dans mySQL), supposons qu'on a un filed dans settings li hta complexe çàd nested donc on fait comme çà "populate("settings.nomDuField")"
        return userFound;
    }

    updateUserById(userId: string, userDetails: UpdateUserDto){
        const updatedUser = this.userModel.findByIdAndUpdate(userId, userDetails, { new: true, setOptions: { new: true } }); // ici on a met {new: true} pour que cette methode nous return le new object qui a été modifié  // ou { displayName: userDetails.displayName, avatarUrl: userDetails.avatarUrl }
        return updatedUser;
    }

    deleteUserById(userId: string){
        const deletedUser = this.userModel.findByIdAndDelete(userId);
        return deletedUser;
    }

}
