export interface EntityPersistRequest<T extends object> {
  no?: number;
  data: T;
}
