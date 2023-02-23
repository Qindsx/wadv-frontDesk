import { Request } from './../utils/request';
const axios = new Request({});

import {
  RroductionConditionsAndInputsDatum,
  CategoryOutputValueDatum,
  AgriculturalProductionDatum,
} from '../types/AgriculturalInputsOutputsController';

interface ResType {
  limit?: string;
  offset?: string;
  year: string[];
}

// 农业相关投入与机械化
export const productionConditionsAndInputsByYears = (data: ResType) => {
  return axios.post<RroductionConditionsAndInputsDatum>(
    '/agriculturalInputsOutputs/productionConditionsAndInputsByYears',
    data
  );
};

// 农林牧渔业分类总产值
export const categoryOutputValueByYears = (data: ResType) => {
  return axios.post<CategoryOutputValueDatum>(
    '/agriculturalInputsOutputs/categoryOutputValueByYears',
    data
  );
};
// 主要农产品产量
export const agriculturalProductionByYears = (data: ResType) => {
  return axios.post<AgriculturalProductionDatum>(
    '/agriculturalInputsOutputs/agriculturalProductionByYears',
    data
  );
};
