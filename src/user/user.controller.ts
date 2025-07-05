import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserItem } from 'src/utils/schemas/user.model';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserItem[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(username: string): Promise<UserItem | null> {
    return this.userService.findOne(username);
  }

  @Post()
  async create(@Body() user: UserItem): Promise<UserItem> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UserItem,
  ): Promise<UserItem | null> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserItem | null> {
    return this.userService.delete(id);
  }
}
