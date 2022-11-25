import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  Active = 'active',
  Pending = 'pending',
  Suspended = 'suspended',
  Deleted = 'deleted',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'User status enum',
  valuesMap: {
    Active: {
      description: 'User is in active state',
    },
    Deleted: {
      description: 'User is in deleted state',
    },
    Suspended: {
      description: 'User is in suspended state',
    },
    Pending: {
      description: 'User is in pending state',
    },
  },
});
