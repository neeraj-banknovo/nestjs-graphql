import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CRON_EXPRESSION } from './cron.enums';

@Injectable()
export class CardCronHandler {
  constructor() {} // list your deps (services/providers) here if required

  @Cron(CRON_EXPRESSION.EVERY_5_SECONDS) // Internal working -> schedule(expression, new CardCronHandler().execute())
  async execute() {
    // cron logic
    console.log('See i am running');
  }
}
