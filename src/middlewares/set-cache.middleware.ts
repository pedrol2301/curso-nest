import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class CacheApplication implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const period = 60 * 5;
    // console.log('cache');
    res.set('Cache-control', `public, max-age=${period}`);
    next();
  }
}
