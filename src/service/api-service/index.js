import axios from 'axios';
import {BASE_URL} from '../../config';
import {mapData, mapError} from './mapData';

const addParams = (url, params) => {
  url += `?`;
  Object.keys(params).forEach(key => {
    url += `${key}=${params[key]}&`;
  });
  return url;
};

class Request {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        lang: 'en',
        versioncode: '11',
        clienttype: 'ios_jike_default',
      },
    });
  }

  get(url, config = {}, queryParams = {}) {
    let cancel;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
    };
    const request = this.api
      .get(addParams(url, queryParams), apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  }

  post(url, body, config = {}, queryParams = {}) {
    let cancel;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
    };
    const request = this.api
      .post(addParams(url, queryParams), body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  }
}

export default Request;
