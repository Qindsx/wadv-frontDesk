// 7
export interface SownOutputPerHectareType {
  autumnGrainCrops: number;
  corn: number;
  cotton: number;
  doubleRotationRice: number;
  earlySeasonRice: number;
  fiberCrops: number;
  grainCrops: number;
  herbCrops: number;
  melons: number;
  midSeasonRice: number;
  oilBerain: number;
  otherCerealsAutumn: number;
  otherCerealsSummer: number;
  paddyRice: number;
  peanuts: number;
  rapeSeeds: number;
  sesame: number;
  soybeanAutumn: number;
  soybeanSummer: number;
  sugarCrops: number;
  summerGrainCrops: number;
  tobacco: number;
  tuberCropsAutumn: number;
  tuberCropsSummer: number;
  vagetable: number;
  wheat: number;
  classify: string;
  year: string;
}

export interface ForestryProductionType {
  bamboo: number;
  bambooTimberHarvesting: number;
  barrenMountain: number;
  blackFungus: number;
  chineseChestnut: number;
  chineseGall: number;
  chineseSapiumSeed: number;
  forestAfforestation: number;
  forestGermchit: number;
  forestTendingArea: number;
  mushroom: number;
  nanBamboo: number;
  oilTeaCamelliaSeed: number;
  reforestationArea: number;
  scatteredTreePlanging: number;
  seedlingArea: number;
  seedlingYield: number;
  seedsTungOilTree: number;
  sundryBamboo: number;
  timber: number;
  whiteFungus: number;
  year: string;
}

export interface AnimalHusbandryProduction {
  shrimpsCaught: number;
  yearendSheep: number;
  slaughteredCattle: string;
  honey: number;
  slaughteredPoultry: string;
  slaughteredFattenedHogs: string;
  horses: number;
  slaughteredSheep: string;
  yearendHogs: number;
  milk: number;
  yearendStockAnimals: number;
}
export interface FisheryProductionType {
  freshCulturedArea: number;
  aquaticProducts: number;
  cowsBreed: number;
  donkeys: number;
  eggs: number;
  femalHogs: number;
  shrimpsArtificially: number;
  fishCaught: number;
  otherCaught: number;
  fishArtificiallyAll: number;
  fishArtificially: number;
  fishCaughtAll: number;
  otherArtificially: number;
  fishCultured: number;
  fishCulturedAll: number;
  mutes: number;
  otherCultured: number;
  shellfhshArtificially: number;
  paddyCulturedArea: number;
  proliferationArtificiallyArea: number;
  shellfhshCaught: number;
  shellfhshCultured: number;
}
export interface TeaFruitProductionType {
  fruitOutputAll: number;
  beefCattle: number;
  greenTea: number;
  otherTea: number;
  kiwiFruit: number;
  citrus: number;
  grapes: number;
  whiteTea: number;
  citrusArea: number;
  kiwiArea: number;
  peachsArea: number;
  grapesArea: number;
  peaches: number;
  pearsArea: number;
  pears: number;
  pickedArea: number;
  persimmons: number;
  teaOutputAll: number;
  teaPlantationArea: number;
  wulongTea: number;
  yearendOrchardArea: number;
}
export interface ProductionOfOtherProductsType
  extends AnimalHusbandryProduction,
    FisheryProductionType,
    TeaFruitProductionType {
  years: string;
}
