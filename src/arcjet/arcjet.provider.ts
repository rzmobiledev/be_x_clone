import { tokenBucket, detectBot, fixedWindow } from '@arcjet/node';

export const userArcjetProvider = {
  provide: 'ARCJET_RULES',
  useValue: [
    tokenBucket({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      refillRate: 5, // refill 5 tokens per interval
      interval: 10, // refill every 10 seconds
      capacity: 10, // bucket maximum capacity of 10 tokens
    }),
    detectBot({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      // configured with a list of bots to allow from
      // https://arcjet.com/bot-list
      allow: [], // "allow none" will block all detected bots
    }),
    fixedWindow({
      mode: 'LIVE',
      window: '1m',
      max: 20,
    }),
  ],
};
