import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUserSettingsDto } from "./CreateUserSettings.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    displayName?: string; // this field is optional

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;

    // we're not defining the avatarUrl field because hta kitsejel l'user 3ad kangoulo lih ila bgha idir une image dyalo qui represente son avatar (3la 7sab l'app hna f had le cas bghina mandirouhach)
}