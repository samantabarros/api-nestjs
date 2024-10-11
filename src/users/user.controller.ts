import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }
  @Get()
  async read() {
    return this.userService.read();
  }
  @Get(':id')
  async readOne(@Param('id') id: string) {
    return this.userService.showUser(id);
  }
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @Param('id') id: string){
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updateParcial(@Body() data: UpdatePatchUserDTO, @Param('id') id: string){
    return this.userService.updatePartial(id, data);
       
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.userService.deleteUser(id);
  }
}
