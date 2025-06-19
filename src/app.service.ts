import { Injectable } from '@nestjs/common';
import Web3, { Web3ZondInterface } from '@theqrl/web3';
import { RegisteredSubscription } from '@theqrl/web3-zond';
import { ZOND_WEBSOCKET_URL } from './constants/app.constants';

@Injectable()
export class AppService {
  zond: Web3ZondInterface;

  constructor() {
    const zondWebSocketProvider = new Web3.providers.WebsocketProvider(
      ZOND_WEBSOCKET_URL,
    );
    this.zond = new Web3({
      provider: zondWebSocketProvider,
    })?.zond;
  }

  async zond_subscribe(
    name: keyof RegisteredSubscription,
    args: { address: string; topics?: string[] },
  ) {
    const subscription = await this.zond?.subscriptionManager?.subscribe(
      name,
      args,
    );
    return { subscriptionId: subscription?.id };
  }

  async zond_unsubscribe(subscriptionId: string) {
    const unsubscription = await this.zond?.subscriptionManager?.unsubscribe(
      ({ id }) => {
        return id === subscriptionId;
      },
    );
    return { unsubscribed: unsubscription.includes(subscriptionId) };
  }
}
