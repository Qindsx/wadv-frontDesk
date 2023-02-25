export interface AgriculturalInvestmentType {
  effectiveIrrigationArea: number;
  electricityRuralArea: number;
  pumpedIrrigationArea: number;
  floodDroughtArea: number;
  nitrogenousFertilizer: number;
  phosphateFertilizer: number;
  potashFertilizer: number;
  mulchFilm: number;
  mulchFilmArea: number;
  comsumptionPesticide: number;
  agriculturalDieselOil: number;
  compoundFertilizer: number;
}
export interface AgricultureMechanizationType {
  combine: number;
  combinePower: number;
  dieselEngines: number;
  gasolineEngines: number;
  largeMachinery: number;
  largePower: number;
  largeTractors: number;
  miniMachinery: number;
  miniPowers: number;
  miniTractors: number;
  motorizedThresher: number;
  pumps: number;
}

export interface RroductionConditionsAndInputsDatum
  extends AgricultureMechanizationType,
    AgriculturalInvestmentType {
  year: string;
}

export interface CategoryValueType {
  farming: number;
  forestry: number;
  animalHusbandry: number;
  industrialService: number;
  fishery: number;
}

export interface FarmingCategoryValueType {
  beans: number;
  cereal: number;
  cotton: number;
  fiberCrops: number;
  flower: number;
  herbCrops: number;
  oilCrops: number;
  otherCrops: number;
  sugarCrops: number;
  teaFruit: number;
  tobacco: number;
  tuberCrops: number;
  vagetable: number;
  wildPlants: number;
}

export interface CategoryOutputValueDatum
  extends CategoryValueType,
    FarmingCategoryValueType {
  year: string;
}

export interface AgriculturalProductionDatum {
  aquaticProducts: number;
  cotton: number;
  eggs: number;
  fruit: number;
  grains: number;
  milk: number;
  oilBearing: number;
  slaughteredHogs: number;
  slaughteredPoultry: number;
  vagetables: number;
  year: string;
}
