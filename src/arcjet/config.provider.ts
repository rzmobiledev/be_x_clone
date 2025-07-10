import { detectBot, fixedWindow } from '@arcjet/node';

export const ConfigArcjetProvider = {
  provide: 'ARCJET_RULES',
  useValue: [
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
    fixedWindow({
      mode: 'LIVE',
      window: '1m',
      max: 20,
    }),
  ],
};
