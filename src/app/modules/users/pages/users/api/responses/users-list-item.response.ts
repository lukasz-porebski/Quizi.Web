import type { AggregateId } from '@lukasz-porebski/lp-common';

export type UsersListItemRawResponse = UsersListItemResponse & {
  createdAt: string;
};

export interface UsersListItemResponse {
  readonly id: AggregateId;
  readonly email: string;
  readonly createdAt: Date;
}
