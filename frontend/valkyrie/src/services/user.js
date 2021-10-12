import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get(`/users/`);
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  createUser(data) {
    return http.post("users/", data);
  }

  updateUser(id, data) {
    return http.put(`/users/${id}`, data);
  }

  deleteUser(id) {
    return http.delete(`/users/${id}`);
  }

  

}

export default new UserDataService();