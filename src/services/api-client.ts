import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

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
