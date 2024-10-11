import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePutUserDTO } from "./dto/update-put-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Injectable()
export class UserService{

constructor(private readonly prisma: PrismaService){}
    async create(data: CreateUserDTO){
        return await this.prisma.user.create({
            data
        });
    }

    async read(){
        return await this.prisma.user.findMany();
    }

    async showUser(id){
        return await this.prisma.user.findUnique({
            where: {
                id,
            }
        });

    }
    async update(id: string, {email, name, password, birthAt}: UpdatePutUserDTO){
        await this.exists(id);
        return await this.prisma.user.update({
            data: {email, name , password, birthAt: birthAt ? new Date(birthAt) : null},
            where:{
                id
            }
        });
    }

    async updatePartial(id: string,  {email, name, password, birthAt}: UpdatePatchUserDTO){
        await this.exists(id);
        const data: any = {};

        if(birthAt){
            data.birthAt = new Date(birthAt)
        }

        if(name){
            data.name = name;
        }
        if(email){
            data.email = email;
        }

        if(password){
            data.password = password;
        }

        return await this.prisma.user.update({

            data,
            where:{
                id
            }
        });
    }

    async deleteUser(id: string){
        await this.exists(id);
        return await this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id:string){
        if(!(await this.showUser(id))){
            throw new NotFoundException(`O usuário com id ${id} não existe!`);
        }
    }
}