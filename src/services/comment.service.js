import http from "../http-common";

class CommentService {
    //selected Movie id
    getAll(id) {
        return http.get(`/comments/${id}`);
    }

    create(id, data) {
        return http.post(`/comments/${id}`, data);
    }

    //not use for now
    delete(id) {
        return http.delete(`/comments/${id}`);
    }
}

export default new CommentService();
