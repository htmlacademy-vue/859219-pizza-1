import Notification from "../common/enums/notification";

export default class Notifier {
  #store;

  constructor(store) {
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch("Notifier/createNotification", {
      text,
      type: Notification.INFO,
    });
  }

  success(text) {
    this.#store.dispatch("Notifier/createNotification", {
      text,
      type: Notification.SUCCESS,
    });
  }

  error(text) {
    this.#store.dispatch("Notifier/createNotification", {
      text,
      type: Notification.ERROR,
    });
  }

  warning(text) {
    this.#store.dispatch("Notifier/createNotification", {
      text,
      type: Notification.WARNING,
    });
  }
}
