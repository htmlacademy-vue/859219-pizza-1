import axios from "../plugins/axios";

import JwtService from "./jwt";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    return await axios.get(this.#resource, config);
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    return await axios.get(`${this.#resource}/${id}`, config);
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;

  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    return await axios.post(this.#resource, entity);
  }

  // запрос на обновление сущности
  async put(entity) {
    return await axios.put(`${this.#resource}/${entity.id}`, entity);
  }

  // запрос на удаление сущности
  async delete(id) {
    return await axios.delete(`${this.#resource}/${id}`);
  }
}
export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  // задаём токен авторизации
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  // отправляем логин/пароль для авторизации на сервере
  async login(params) {
    return await axios.post("login", params);
  }

  // делаем логаут на сервере
  async logout() {
    return await axios.delete("logout");
  }

  // получаем профиль залогиненного пользователя
  async getMe() {
    return await axios.get("whoAmI");
  }
}
