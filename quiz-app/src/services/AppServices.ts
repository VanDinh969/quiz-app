import { API_URL } from "./AppApi";
import questionsApi from "./QuestionsApi";

export default new (class AppServices {
  // Search - Get
  async getQuestions() {
    let data: any;
    // const userId = id ? `/${id}` : "";
    await questionsApi.getRequest(`${API_URL}`).then((response) => {
      data = response.data;
    });
    return data;
  }

  // Post - Create
  async postQuestions(postContent: object) {
    let data: any;
    await questionsApi.postRequest(API_URL, postContent).then((response) => {
      data = response.data;
    });

    return data;
  }

  // Delete
  async deleteQuestions(id: string) {
    let data: any;
    await questionsApi.deleteRequest(`${API_URL}/${id}`).then((response) => {
      data = response.data;
    });
    return data;
  }

  // Update
  async updateQuestions(id: string, updateContent: object) {
    let data: any;
    await questionsApi
      .updateRequest(`${API_URL}/${id}`, updateContent)
      .then((response) => {
        data = response.data;
      });
    return data;
  }
})();
