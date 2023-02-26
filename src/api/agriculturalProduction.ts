import { Request } from './../utils/request';
const axios = new Request({});

import {
  ProductionOfOtherProductsType,
  ForestryProductionType,
  TreeSownOutputPerHectareType,
} from '../types/AgriculturalProductionController';

interface ResType {
  limit?: string;
  offset?: string;
  year: string[];
}
interface cropProductionResType extends ResType {
  classify?: string;
}

// 农作物生产情况(播种面积、单位产量、产量)
export const cropProductionByYears = (data: cropProductionResType) => {
  return axios.post<TreeSownOutputPerHectareType>(
    '/agriculturalProduction/cropProductionByYears',
    data
  );
};
// 林业生产情况
export const forestryProductionByYears = (data: ResType) => {
  return axios.post<ForestryProductionType>(
    '/agriculturalProduction/forestryProductionByYears',
    data
  );
};
// 牧渔、茶叶和水果生产情况
export const otherProductionSituationByYears = (data: ResType) => {
  return axios.post<ProductionOfOtherProductsType>(
    '/agriculturalProduction/otherProductionSituationByYears',
    data
  );
};
