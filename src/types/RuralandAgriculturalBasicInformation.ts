export interface RuralInfrastructure1Type {
  count?: number;
  data: RuralInfrastructure1Datum[];
}

export interface RuralInfrastructure1Datum {
  /**
   * 农业从业人员(万人)
   */
  agriculturalLaborers: number;
  /**
   * 农林牧渔(万人)
   */
  agricultureEmployees: number;
  /**
   * 非农业从业人员(万人)
   */
  noAgriculturalLaborers: number;
  /**
   * 非农从业人员(万人)
   */
  noAgricultureEmployees: number;
  /**
   * 村委会(个)
   */
  subdistrictOff: number;
  /**
   * 办事处(个)
   */
  townGov: number;
  /**
   * 乡政府（个）
   */
  townshipGov: number;
  /**
   * 村民小组(个)
   */
  villagersCom: number;
  /**
   * 村民小组(个)
   */
  villagersSub: number;
  /**
   * 通宽带村数(个)
   */
  villagesBroad: number;
  /**
   * 通宽带村数占全部村委会比重(%)
   */
  villagesPropBroad: number;
  /**
   * 通有线电视村数占全部村委会比重(%)
   */
  villagesPropTv: number;
  /**
   * 自来水受益村数占全部村委会比重(%)
   */
  villagesPropWater: number;
  /**
   * 通有线电视村数(个)
   */
  villagesTv: number;
  /**
   * 自来水受益村数(个)
   */
  villagesWater: number;
  /**
   * 年份
   */
  year: string;
}

export interface GrossIndicesgross3Type {
  count?: number;
  data: GrossIndicesgross3Datum[];
}

export interface GrossIndicesgross3Datum {
  /**
   * 农林牧渔总产值
   */
  grossOutputValue: number;
  /**
   * 农业
   */
  indicesGrossFarming: number;
  /**
   * 渔业
   */
  indicesGrossFishery: number;
  /**
   * 林业
   */
  indicesGrossForestry: number;
  /**
   * 牧业
   */
  indicesGrossHusbandry: number;
  /**
   * 农林渔牧总产值指数
   */
  indicesGrossTotal: number;
  /**
   * 年份
   */
  year: string;
}

export interface GrossOutputCompoosition4Type {
  count?: number;
  data?: GrossOutputCompoosition4Datum[];
}

export interface GrossOutputCompoosition4Datum {
  /**
   * 农业
   */
  farming: number;
  /**
   * 渔业
   */
  fishery: number;
  /**
   * 林业
   */
  forestry: number;
  /**
   * 牧业
   */
  husbandry: number;
  /**
   * 农林牧渔服务业
   */
  industrialService: number;
  /**
   * 农林牧渔业总计
   */
  total: number;
  /**
   * 年份
   */
  year: string;
}
