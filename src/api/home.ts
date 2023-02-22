import { Request } from './../utils/request';
const axios = new Request({});

import {
  RuralInfrastructure1Type,
  RuralInfrastructure1Datum,
  GrossIndicesgross3Type,
  GrossIndicesgross3Datum,
  GrossOutputCompoosition4Type,
  GrossOutputCompoosition4Datum,
} from '../types/RuralandAgriculturalBasicInformation';

interface ResType {
  limit?: string;
  offset?: string;
  year: string[];
}

// 农村基层组织﹑户数、人口、从业人员
export const grassrootsInfoByYears = (data: ResType) => {
  return axios.post<RuralInfrastructure1Datum>(
    '/basicInfo/grassrootsInfoByYears',
    data
  );
};

// 农林牧渔业总产值及指数
export const productionValueAndCompositionInfoByYears = (data: ResType) => {
  return axios.post<GrossOutputCompoosition4Datum>(
    '/basicInfo/productionValueAndCompositionInfoByYears',
    data
  );
};

// 农林牧渔业产值及构成
export const productionValueInfoByYears = (data: ResType) => {
  return axios.post<GrossIndicesgross3Datum>(
    '/basicInfo/productionValueInfoByYears',
    data
  );
};
