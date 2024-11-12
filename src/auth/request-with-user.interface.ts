import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    mId: number;
    mEmail: string;
  }; 
}