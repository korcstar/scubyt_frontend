import http from "../http-common";

class MovieDataService {
  getAll(params) {
    return http.get("/movies", { params });
  }
  //not use for now
  get(id) {
    return http.get(`/movies/${id}`);
  }
  //not use for now
  create(data) {
    return http.post("/movies", data);
  }
  //not use for now
  update(id, data) {
    return http.put(`/movies/${id}`, data);
  }
  //not use for now
  delete(id) {
    return http.delete(`/movies/${id}`);
  }
  //not use for now
  deleteAll() {
    return http.delete("/movies");
  }
}

export default new MovieDataService();
