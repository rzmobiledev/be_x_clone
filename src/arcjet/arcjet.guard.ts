import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Optional,
} from '@nestjs/common';
import arcjet from '@arcjet/node';
import { Request } from 'express';
import { ARCJET_DEFAULT_RULES } from './arcjet.rules';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class ArcjetGuard implements CanActivate {
  private aj: ReturnType<typeof arcjet>;

  constructor(
    @Optional() @Inject('ARCJET_RULES') private rules: [] = [],
    private configService: ConfigService,
  ) {
    this.aj = arcjet({
      key: this.configService.get<string>('ARCJET_KEY')!,
      rules: [...ARCJET_DEFAULT_RULES, ...this.rules],
    });
  }

  // canActivate contains the main logic for determining whether a
  // request should be allowed to proceed. It returns a boolean value
  // (or a Promise that resolves to a boolean) indicating whether the
  // request is authorized.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const decision = await this.aj.protect(request);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new HttpException(
          'Too many requests',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      if (decision.reason.isBot()) {
        throw new HttpException('Bot detected', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
