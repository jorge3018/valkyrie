import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get(`/products/`);
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  createProduct(data) {
    return http.post("products/", data);
  }

  updateProduct(id, data) {
    return http.put(`/products/${id}`, data);
  }

  deleteProduct(id) {
    return http.delete(`/products/${id}`);
  }

  

}

export default new ProductDataService();