import { registerEnumType } from '@nestjs/graphql';

export enum CardCategory {
  physical = 'physical',
  Virtual = 'virtual',
}

export enum CardStatus {
  Active = 'active',
  Closed = 'closed',
}

registerEnumType(CardStatus, {
  name: 'CardStatus',
  description: 'Card status enum',
  valuesMap: {
    Active: {
      description: 'Card is active',
    },
    Closed: {
      description: 'Card is closed',
    },
  },
});

registerEnumType(CardCategory, {
  name: 'CardCategory',
  description: 'Card category enum',
  valuesMap: {
    physical: {
      description: 'Physical card',
    },
    Virtual: {
      description: 'Virtual card',
    },
  },
});
