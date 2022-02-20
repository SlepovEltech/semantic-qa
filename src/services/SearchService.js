import http from "../http-common";

class SearchService {
  searchAnswer(query) {
    return http.get(`/?query=${query}`);
  }

  getEntity(substring){
    return http.get(`/autocomplete/entity?substr=${substring}`);
  }

  executeConstructor(data) {
    return http.post("/", data);
  }
}

export default new SearchService();
