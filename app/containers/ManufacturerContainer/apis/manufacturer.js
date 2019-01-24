import axios from 'axios';
import { MANIN_BACKEND_ROOT_URL } from '../../../properties/local-props';

// endpoint root
const root = `${MANIN_BACKEND_ROOT_URL}/manufacturer/v1`;

export default class ManufacturerAPI {
  static getAllManufacturers() {
    return axios.get(`${root}/getAllManufacturers`);
  }

  static getManufacturerDetailFor(payload) {
    return axios.get(`${root}/id/${payload}`);
  }

  static edit(payload) {
    return axios.put(`${root}/edit/payload.id`, payload);
  }

  static create(payload) {
    return axios.post(`${root}/create`, payload);
  }

  static delete(payload) {
    return axios.delete(`${root}/delete/${payload.id}`);
  }
}
