import http from "../http-common";

class SearchService {
  searchAnswer(query) {
    return http.get(`/?query=${query}`);
  }
}

export default new SearchService();
