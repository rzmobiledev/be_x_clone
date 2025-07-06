import { User } from '@clerk/backend';
import { Request } from 'express';

export type TReqUser = Request & User;
