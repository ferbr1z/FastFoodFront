import { api } from "./api";

export class ProductoApi {
  static uri = "/producto";

  static async create(data) {
    return await api.post(`${this.uri}`, data);
  }

  static async all(page = 1) {
    return await api.get(`${this.uri}/${page}`);
  }

  static async find(id) {
    return await api.get(`${this.uri}/id/${id}`);
  }

  static async update(id, data) {
    return await api.put(`${this.uri}/id/${id}`, data);
  }

  static async delete(id) {
    return await api.delete(`${this.uri}/id/${id}`);
  }
}
