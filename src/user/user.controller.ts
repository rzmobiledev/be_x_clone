import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserItem } from 'src/utils/schemas/user.model';
import { Request, Response } from 'express';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationItem } from 'src/utils/schemas/notification.model';
import { TReqUser } from 'src/utils/commons/express.http.schema';

@Controller('profile')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notification: NotificationService,
  ) {}

  @Get()
  async findAll(): Promise<UserItem[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  async getUserProfile(@Req() req: TReqUser, @Res() res: Response) {
    const { username } = req;
    const user = await this.userService.findOne(username!);
    if (!user)
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
    res.status(HttpStatus.OK).json(user);
  }

  @Post()
  async syncUser(@Req() req: TReqUser, @Res() res: Response): Promise<void> {
    const { id, emailAddresses, firstName, lastName, imageUrl } = req;

    const userData = {
      clerkId: id,
      userName: emailAddresses[0].emailAddress.split('@')[0],
      email: emailAddresses[0].emailAddress,
      firstName: firstName as string,
      lastName: lastName as string,
      profilePicture: imageUrl,
      bannerImage: '',
      bio: '',
      location: '',
      followers: [],
      following: [],
      createdAt: new Date(),
    } as unknown as UserItem;

    const user = await this.userService.create(userData);
    res.status(HttpStatus.CREATED).json(user);
  }

  @Put()
  async updateProfile(@Res() res: Response, @Body() user: UserItem) {
    const created = await this.userService.update(user);
    if (!created)
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
    res.status(HttpStatus.OK).json(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserItem | null> {
    return this.userService.delete(id);
  }

  @Post(':targetUserId')
  async followUser(
    @Res() res: Response,
    @Req() req: TReqUser,
    @Param('targetUserId') targetUserId: string,
  ) {
    const { id, username } = req;

    if (id === targetUserId)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'You cannot follow yourself' });

    const currentUser = await this.userService.findOne(username!);
    const targetUser = await this.userService.findById(targetUserId);

    if (!targetUser || !currentUser)
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });

    const isFollowing: boolean = currentUser?.following.includes(targetUserId);

    if (isFollowing) {
      await this.userService.unfollow(currentUser._id as string, targetUserId);
      await this.userService.unfollow(targetUserId, currentUser._id as string);
    } else {
      await this.userService.following(currentUser._id as string, targetUserId);
      await this.userService.following(targetUserId, currentUser._id as string);
      await this.notification.create({
        from: currentUser._id,
        to: targetUser._id,
        type: 'follow',
      } as NotificationItem);
    }
    res.status(HttpStatus.OK).json({
      message: isFollowing
        ? 'User unfollowed successfully'
        : 'User followed successfuly',
    });
  }
}
