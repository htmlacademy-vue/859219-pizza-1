import Resource from "../common/enums/resource";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "../services/api";

export const createResources = (notifier) => {
  return {
    [Resource.ADDRESSES]: new CrudApiService(Resource.ADDRESSES, notifier),
    [Resource.AUTH]: new AuthApiService(notifier),
    [Resource.DOUGH]: new ReadOnlyApiService(Resource.DOUGH, notifier),
    [Resource.INGREDIENTS]: new ReadOnlyApiService(
      Resource.INGREDIENTS,
      notifier
    ),
    [Resource.MISC]: new ReadOnlyApiService(Resource.MISC, notifier),
    [Resource.ORDERS]: new CrudApiService(Resource.ORDERS, notifier),
    [Resource.SAUCES]: new ReadOnlyApiService(Resource.SAUCES, notifier),
    [Resource.SIZES]: new ReadOnlyApiService(Resource.SIZES, notifier),
  };
};
