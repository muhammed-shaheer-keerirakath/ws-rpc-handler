import { Web3ZondInterface } from '@theqrl/web3';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  const mockSubscribe = jest.fn();
  const mockUnsubscribe = jest.fn();

  const mockZond = {
    subscriptionManager: {
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
    },
  };

  beforeEach(() => {
    appService = new AppService();
    appService.zond = mockZond as unknown as Web3ZondInterface;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('zond_subscribe', () => {
    it('should return subscriptionId when subscription succeeds', async () => {
      mockSubscribe.mockResolvedValue({
        id: '0xbb0ecff80c39d75faac664a6dff7c43a',
      });

      const result = await appService.zond_subscribe('logs', {
        address: 'Z208318ecd68f26726CE7C54b29CaBA94584969B6',
      });

      expect(mockSubscribe).toHaveBeenCalledWith('logs', {
        address: 'Z208318ecd68f26726CE7C54b29CaBA94584969B6',
      });
      expect(result).toEqual({
        subscriptionId: '0xbb0ecff80c39d75faac664a6dff7c43a',
      });
    });

    it('should return undefined subscriptionId if subscription fails', async () => {
      mockSubscribe.mockResolvedValue(undefined);

      const result = await appService.zond_subscribe('logs', {
        address: 'Z208318ecd68f26726CE7C54b29CaBA94584969B6',
      });

      expect(result).toEqual({ subscriptionId: undefined });
    });
  });

  describe('zond_unsubscribe', () => {
    it('should return true if subscriptionId is in the unsubscribed list', async () => {
      mockUnsubscribe.mockResolvedValue(['0xbb0ecff80c39d75faac664a6dff7c43a']);

      const result = await appService.zond_unsubscribe(
        '0xbb0ecff80c39d75faac664a6dff7c43a',
      );

      expect(mockUnsubscribe).toHaveBeenCalled();
      expect(result).toEqual({ unsubscribed: true });
    });

    it('should return false if subscriptionId is not in the list', async () => {
      mockUnsubscribe.mockResolvedValue([]);

      const result = await appService.zond_unsubscribe(
        '0xbb0ecff80c39d75faac664a6dff7c43a',
      );

      expect(result).toEqual({ unsubscribed: false });
    });
  });
});
