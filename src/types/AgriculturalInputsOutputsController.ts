export interface RroductionConditionsAndInputsDatum {
  agriculturalDieselOil: number;
  combine: number;
  combinePower: number;
  compoundFertilizer: number;
  comsumptionPesticide: number;
  dieselEngines: number;
  effectiveIrrigationArea: number;
  electricityRuralArea: number;
  floodDroughtArea: number;
  gasolineEngines: number;
  largeMachinery: number;
  largePower: number;
  largeTractors: number;
  miniMachinery: number;
  miniPowers: number;
  miniTractors: number;
  motorizedThresher: number;
  mulchFilm: number;
  mulchFilmArea: number;
  nitrogenousFertilizer: number;
  phosphateFertilizer: number;
  potashFertilizer: number;
  pumpedIrrigationArea: number;
  pumps: number;
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
