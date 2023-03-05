import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(
  (response) => response.data,

  (error) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";

    axiosInstance.$notifier.error(
      error.response?.data.error?.message || defaultMessage
    );

    return Promise.reject(error);
  }
);

export default axiosInstance;
