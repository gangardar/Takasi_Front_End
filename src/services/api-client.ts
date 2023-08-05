import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiToken = localStorage.getItem("apiToken");

    if (apiToken) {
      // Add headers to the request
      const token = `Bearer ${apiToken}`;
      config.headers["Authorization"] = token;
    }
    // console.log("request config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll() {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  }

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  suspend = (id: number) => {
    return axiosInstance
      .post(`${this.endpoint}/?id=${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
