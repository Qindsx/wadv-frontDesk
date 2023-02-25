<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  ForestryProduction,
  SownOutputPerHectare,
} from '../components/AgriculturalProduction';
import { otherProductionSituationByYears } from '../api/agriculturalProduction';
import {
  TeaFruitProductionType,
  FisheryProductionType,
  ProductionOfOtherProductsType,
} from '../types/AgriculturalProductionController';
import { onMounted } from 'vue';

onMounted(async () => {
  const res = await otherProductionSituationByYears({ year: ['2019', '2020'] });
  console.log(res);
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
      <div
        class="chart-div col-span-3 col-start-1 row-span-2 row-start-1"
      ></div>
      <div
        class="chart-div col-span-3 col-start-4 row-span-2 row-start-1"
      ></div>
      <div class="chart-div col-span-4 col-start-7 row-span-2 row-start-1">
        <SownOutputPerHectare></SownOutputPerHectare>
      </div>
      <div class="chart-div col-span-5 col-start-1 row-span-1 row-start-3">
        <ForestryProduction></ForestryProduction>
      </div>
      <div
        class="chart-div col-span-5 col-start-6 row-span-1 row-start-3"
      ></div>
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
