import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockZondSubscribe = jest.fn();
const mockZondUnsubscribe = jest.fn();

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            zond_subscribe: mockZondSubscribe,
            zond_unsubscribe: mockZondUnsubscribe,
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /zond_subscribe', () => {
    it('should return subscriptionId from AppService', async () => {
      mockZondSubscribe.mockResolvedValue({
        subscriptionId: '0xbb0ecff80c39d75faac664a6dff7c43a',
      });

      const result = await appController.zond_subscribe({
        params: [
          'logs',
          { address: 'Z208318ecd68f26726CE7C54b29CaBA94584969B6' },
        ],
      });

      expect(mockZondSubscribe).toHaveBeenCalledWith('logs', {
        address: 'Z208318ecd68f26726CE7C54b29CaBA94584969B6',
      });
      expect(result).toEqual({
        subscriptionId: '0xbb0ecff80c39d75faac664a6dff7c43a',
      });
    });
  });

  describe('POST /zond_unsubscribe', () => {
    it('should return unsubscribed true from AppService', async () => {
      mockZondUnsubscribe.mockResolvedValue({ unsubscribed: true });

      const result = await appController.zond_unsubscribe({
        params: ['0xbb0ecff80c39d75faac664a6dff7c43a'],
      });

      expect(mockZondUnsubscribe).toHaveBeenCalledWith(
        '0xbb0ecff80c39d75faac664a6dff7c43a',
      );
      expect(result).toEqual({ unsubscribed: true });
    });

    it('should return unsubscribed false if AppService returns false', async () => {
      mockZondUnsubscribe.mockResolvedValue({ unsubscribed: false });

      const result = await appController.zond_unsubscribe({
        params: ['0xbb0ecff80c39d75faac664a6dff7c43a'],
      });

      expect(result).toEqual({ unsubscribed: false });
    });
  });
});
