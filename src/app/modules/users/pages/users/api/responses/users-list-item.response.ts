import type { AggregateId } from '@common/types/aggregate-id.type';

export type UsersListItemRawResponse = UsersListItemResponse & {
  createdAt: string;
};

export interface UsersListItemResponse {
  readonly id: AggregateId;
  readonly email: string;
  readonly createdAt: Date;
}
