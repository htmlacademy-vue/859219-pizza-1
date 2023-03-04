import { setAuth } from "../common/helpers";

export default function auth({ next, store, nextMiddleware }) {
  if (!store.getters["Auth/isAuthorized"]) {
    const token = store.$jwt.getToken();

    if (token) {
      setAuth(store);
    } else {
      next("/");
    }
  }

  return nextMiddleware();
}
