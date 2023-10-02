import axios from "axios";

export default class ApiService {
  browserInfo = navigator.userAgent;
  constructor() {
    axios.interceptors.request.use(
      (request: any) => {
        if (this.browserInfo) {
          // request.headers["Browser-Info"] = this.browserInfo;
        }
        return request;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response } = error;
        if (response.status === 500) {
          alert("Error with code 500!");
        }
      }
    );
  }

  getRequest(link: string) {
    return axios.get(link);
  }

  postRequest(link: string, postContent: object) {
    return axios.post(link, postContent);
  }

  deleteRequest(link: string) {
    return axios.delete(link);
  }

  updateRequest(link: string, updateContent: object) {
    return axios.put(link, updateContent);
  }
}
