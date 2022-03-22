import {getData, removeData, saveData} from '../../service/storage-service';
import * as types from './constants';

export const DARK_MODE = {
  get: () => getData(types.DARK_MODE),
  set: value => saveData(types.DARK_MODE, value),
  remove: () => removeData(types.DARK_MODE),
};
