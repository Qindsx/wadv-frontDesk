// 7
export interface TreeSownOutputPerHectareDataType {
  agriculturalProductName: string;
  children?: any[];
  id: string;
  name: string;
  parentName: string;
  value: number;
}
export interface TreeSownOutputPerHectareType {
  data: TreeSownOutputPerHectareDataType[];
  year: string;
}

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

export interface AnimalHusbandryProductionType {
  yearendStockAnimals: number;
  cowsBreed: number;
  beefCattle: number;
  horses: number;
  donkeys: number;
  mutes: number;
  yearendSheep: number;
  yearendHogs: number;
  femalHogs: number;
  slaughteredFattenedHogs: string;
  slaughteredCattle: string;
  slaughteredSheep: string;
  slaughteredPoultry: string;
  milk: number;
  honey: number;
  eggs: number;
}
export interface FisheryProductionType {
  shrimpsCultured: number;
  shrimpsCaught: number;
  freshCulturedArea: number;
  aquaticProducts: number;
  shrimpsArtificially: number;
  fishCaught: number;
  otherCaught: number;
  fishArtificiallyAll: number;
  fishArtificially: number;
  fishCaughtAll: number;
  otherArtificially: number;
  fishCultured: number;
  fishCulturedAll: number;
  otherCultured: number;
  shellfhshArtificially: number;
  paddyCulturedArea: number;
  proliferationArtificiallyArea: number;
  shellfhshCaught: number;
  shellfhshCultured: number;
}
export interface TeaFruitProductionType {
  fruitOutputAll: number;
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
  extends AnimalHusbandryProductionType,
    FisheryProductionType,
    TeaFruitProductionType {
  years: string;
}
