import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisteredSubscription } from '@theqrl/web3/lib/commonjs/zond.exports';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('zond_subscribe')
  async zond_subscribe(
    @Body()
    data: {
      params: [
        keyof RegisteredSubscription,
        { address: string; topics?: string[] },
      ];
    },
  ) {
    const [name, args] = data.params;
    return await this.appService.zond_subscribe(name, args);
  }

  @Post('zond_unsubscribe')
  async zond_unsubscribe(
    @Body()
    data: {
      params: [string];
    },
  ) {
    const [subscriptionId] = data.params;
    return await this.appService.zond_unsubscribe(subscriptionId);
  }
}
