import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, unknown> {
    return { success: true, message: 'See.. your app is up and running 👌🏻!!' };
  }
}
