import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['auth-user'];
    if (!auth) {
      return res.json({
        status: 401,
        message: 'no auth',
      });
    }
    try {
      const decodedToken = jwt.verify(auth.toString(), 'hamza13072001');
      console.log(decodedToken);
      req['userId'] = decodedToken['userId'];
      console.log('middleware : ', req['userId']);
      next();
    } catch (error) {
      return res.json({
        status: 401,
        message: 'no auth',
      });
    }
  }
}
