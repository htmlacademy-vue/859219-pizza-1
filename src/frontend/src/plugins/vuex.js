import { createResources } from "../common/helpers";
import Notifier from "../plugins/notifier";
import JwtService from "../services/jwt";

export default function (store) {
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
  store.$jwt = JwtService;
}
