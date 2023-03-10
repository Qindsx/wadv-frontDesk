<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  CategoryOutputValue,
  AgriculturalProduction,
  AgriculturalInvestment,
  AgricultureMechanization,
} from '../components/InvestmentOutput';
import { productionConditionsAndInputsByYears } from '../api/investmentOutput';
import {
  AgriculturalInvestmentType,
  AgricultureMechanizationType,
} from '../types/AgriculturalInputsOutputsController';
import { onMounted, Ref, ref } from 'vue';

const agriculturalInvestmentData: Ref<AgriculturalInvestmentType[]> = ref([]);
const agricultureMechanizationData: Ref<AgricultureMechanizationType[]> = ref(
  []
);
const years: Ref<string[]> = ref([]);

onMounted(async () => {
  const res = await productionConditionsAndInputsByYears({
    year: ['2019', '2020'],
  });
  res.data.forEach((item) => {
    let {
      effectiveIrrigationArea,
      electricityRuralArea,
      pumpedIrrigationArea,
      floodDroughtArea,
      nitrogenousFertilizer,
      phosphateFertilizer,
      potashFertilizer,
      mulchFilm,
      mulchFilmArea,
      comsumptionPesticide,
      agriculturalDieselOil,
      compoundFertilizer,

      combine,
      combinePower,
      dieselEngines,
      gasolineEngines,
      largeMachinery,
      largePower,
      largeTractors,
      miniMachinery,
      miniPowers,
      miniTractors,
      motorizedThresher,
      pumps,
    } = item;
    agriculturalInvestmentData.value.push({
      effectiveIrrigationArea,
      electricityRuralArea,
      pumpedIrrigationArea,
      floodDroughtArea,
      nitrogenousFertilizer,
      phosphateFertilizer,
      potashFertilizer,
      mulchFilm,
      mulchFilmArea,
      comsumptionPesticide,
      agriculturalDieselOil,
      compoundFertilizer,
    });
    agricultureMechanizationData.value.push({
      combine,
      combinePower,
      dieselEngines,
      gasolineEngines,
      largeMachinery,
      largePower,
      largeTractors,
      miniMachinery,
      miniPowers,
      miniTractors,
      motorizedThresher,
      pumps,
    });
    years.value.push(item.year);
  });
  console.log(res.data);
});
const router = useRouter();
</script>

<template>
  <div>
    <div
      class="text-lg z-10 text-center absolute flex top-6"
      style="left: 14.44444%"
    >
      <div
        class="button-bg w-32"
        @click="() => router.push('/agriculturalProduction')"
      >
        农产品产量
      </div>
      <div
        class="button-bg-active w-32"
        @click="() => router.push('/investmentOutput')"
      >
        投入与产量
      </div>
      <div class="button-bg w-32" @click="() => router.push('/home')">首页</div>
    </div>
    <header id="header" class="">
      <h3 class="header-title">武汉农业数据可视化大屏</h3>
    </header>
    <div id="container" class="grid grid-cols-10 grid-rows-3 gap-2 px-1">
      <div
        class="chart-div col-start-1 col-span-6 row-start-1 row-span-2 flex flex-col"
      >
        <CategoryOutputValue></CategoryOutputValue>
      </div>
      <div class="col-start-7 col-span-4 row-start-1 row-span-2 flex flex-col">
        <AgriculturalProduction></AgriculturalProduction>
      </div>
      <div
        class="chart-div col-start-1 col-span-5 row-start-3 row-span-1 flex flex-col"
      >
        <AgriculturalInvestment
          :years="years"
          :agriculturalInvestmentData="agriculturalInvestmentData"
        ></AgriculturalInvestment>
      </div>
      <div
        class="chart-div col-start-6 col-span-5 row-start-3 row-span-1 flex flex-col"
      >
        <AgricultureMechanization
          :agricultureMechanizationData="agricultureMechanizationData"
          :years="years"
        ></AgricultureMechanization>
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
