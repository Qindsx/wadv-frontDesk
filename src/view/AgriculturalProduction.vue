<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  ForestryProduction,
  SownOutputPerHectare,
  AnimalHusbandryProduction,
  FisheryProduction,
  ProductionOfTeaAndFruit,
} from '../components/AgriculturalProduction';
import { otherProductionSituationByYears } from '../api/agriculturalProduction';
import {
  TeaFruitProductionType,
  FisheryProductionType,
  ProductionOfOtherProductsType,
  AnimalHusbandryProductionType,
} from '../types/AgriculturalProductionController';
import { onMounted, Ref, ref } from 'vue';

const FisheryProductionData: Ref<FisheryProductionType[]> = ref([]);
const AnimalHusbandryProductionData: Ref<AnimalHusbandryProductionType[]> = ref(
  []
);
const TeaFruitProductionData: Ref<TeaFruitProductionType[]> = ref([]);
const years = ref(['2019', '2020']);

onMounted(async () => {
  const res = await otherProductionSituationByYears({ year: years.value });
  if (res.data) {
    res.data.forEach((item) => {
      let {
        //  渔业
        shrimpsCultured,
        shrimpsCaught,
        freshCulturedArea,
        aquaticProducts,
        shrimpsArtificially,
        fishCaught,
        otherCaught,
        fishArtificiallyAll,
        fishArtificially,
        fishCaughtAll,
        otherArtificially,
        fishCultured,
        fishCulturedAll,
        otherCultured,
        shellfhshArtificially,
        paddyCulturedArea,
        proliferationArtificiallyArea,
        shellfhshCaught,
        shellfhshCultured,

        // 茶叶 水果
        fruitOutputAll,
        greenTea,
        otherTea,
        kiwiFruit,
        citrus,
        grapes,
        whiteTea,
        citrusArea,
        kiwiArea,
        peachsArea,
        grapesArea,
        peaches,
        pearsArea,
        pears,
        pickedArea,
        persimmons,
        teaOutputAll,
        teaPlantationArea,
        wulongTea,
        yearendOrchardArea,

        // 牧业
        yearendStockAnimals,
        cowsBreed,
        beefCattle,
        horses,
        donkeys,
        mutes,
        yearendSheep,
        yearendHogs,
        femalHogs,
        slaughteredFattenedHogs,
        slaughteredCattle,
        slaughteredSheep,
        slaughteredPoultry,
        milk,
        honey,
        eggs,
      } = item;

      FisheryProductionData.value.push({
        shrimpsCultured,
        shrimpsCaught,
        freshCulturedArea,
        aquaticProducts,
        shrimpsArtificially,
        fishCaught,
        otherCaught,
        fishArtificiallyAll,
        fishArtificially,
        fishCaughtAll,
        otherArtificially,
        fishCultured,
        fishCulturedAll,
        otherCultured,
        shellfhshArtificially,
        paddyCulturedArea,
        proliferationArtificiallyArea,
        shellfhshCaught,
        shellfhshCultured,
      });

      AnimalHusbandryProductionData.value.push({
        yearendStockAnimals,
        cowsBreed,
        beefCattle,
        horses,
        donkeys,
        mutes,
        yearendSheep,
        yearendHogs,
        femalHogs,
        slaughteredFattenedHogs: slaughteredFattenedHogs.split('/')[0],
        slaughteredCattle: slaughteredCattle.split('/')[0],
        slaughteredSheep: slaughteredSheep.split('/')[0],
        slaughteredPoultry: slaughteredPoultry.split('/')[0],
        milk,
        honey,
        eggs,
      });

      TeaFruitProductionData.value.push({
        fruitOutputAll,
        greenTea,
        otherTea,
        kiwiFruit,
        citrus,
        grapes,
        whiteTea,
        citrusArea,
        kiwiArea,
        peachsArea,
        grapesArea,
        peaches,
        pearsArea,
        pears,
        pickedArea,
        persimmons,
        teaOutputAll,
        teaPlantationArea,
        wulongTea,
        yearendOrchardArea,
      });
    });
  }
});
const router = useRouter();
</script>

<template>
  <div
    class="text-lg z-10 text-center absolute flex top-6"
    style="left: 14.44444%"
  >
    <div class="button-bg w-32" @click="() => router.push('/investmentOutput')">
      投入与产量
    </div>
    <div
      class="button-bg-active w-32"
      @click="() => router.push('/agriculturalProduction')"
    >
      农产品产量
    </div>
    <div class="button-bg w-32" @click="() => router.push('/home')">首页</div>
  </div>
  <div>
    <header id="header" class="">
      <h3 class="header-title">大屏数据可视化模板</h3>
    </header>
    <div id="container" class="grid grid-cols-10 grid-rows-3 gap-2 px-1">
      <div class="chart-div col-span-3 col-start-1 row-span-2 row-start-1">
        <AnimalHusbandryProduction
          :years="years"
          :data="AnimalHusbandryProductionData"
        ></AnimalHusbandryProduction>
      </div>
      <div class="chart-div col-span-3 col-start-4 row-span-2 row-start-1">
        <ProductionOfTeaAndFruit
          :years="years"
          :data="TeaFruitProductionData"
        ></ProductionOfTeaAndFruit>
      </div>
      <div class="chart-div col-span-4 col-start-7 row-span-2 row-start-1">
        <SownOutputPerHectare></SownOutputPerHectare>
      </div>
      <div class="chart-div col-span-5 col-start-1 row-span-1 row-start-3">
        <FisheryProduction
          :data="FisheryProductionData"
          :years="years"
        ></FisheryProduction>
      </div>
      <div class="chart-div col-span-5 col-start-6 row-span-1 row-start-3">
        <ForestryProduction></ForestryProduction>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('../assets/css/app.css');
.button-bg-active {
  cursor: pointer;
  background-image: url('../assets/img/page_button_active.png');
  background-repeat: no-repeat;
  background-position: 0%;
}

.button-bg {
  cursor: pointer;
  background-image: url('../assets/img/page_button.png');
  background-repeat: no-repeat;
  background-position: 0%;
}
</style>
