<script setup lang="ts">
import { Carousel, Slide } from 'vue-snap';
import 'vue-snap/dist/vue-snap.css';
import { TreeMapCharts } from '../charts';

import { cropProductionByYears } from '../../api/agriculturalProduction';
import { TreeSownOutputPerHectareType } from '../../types/AgriculturalProductionController';
import { onMounted, ref, Ref } from 'vue';

const sownData: Ref<TreeSownOutputPerHectareType[]> = ref([]);
const sownYears = ref<string[]>([]);
const outputData: Ref<TreeSownOutputPerHectareType[]> = ref([]);
const outputYears = ref<string[]>([]);
const perHectareData: Ref<TreeSownOutputPerHectareType[]> = ref([]);
const perHectareYears = ref<string[]>([]);

// sown|output|per hectare
onMounted(async () => {
  const res = await Promise.all([
    cropProductionByYears({
      classify: 'sown',
      year: ['2016', '2017', '2018', '2019', '2020'],
    }),
    cropProductionByYears({
      classify: 'output',
      year: ['2016', '2017', '2018', '2019', '2020'],
    }),
    cropProductionByYears({
      classify: 'per hectare',
      year: ['2016', '2017', '2018', '2019', '2020'],
    }),
  ]);
  if (res[0] && res[1] && res[2]) {
    sownData.value = res[0].data;
    sownYears.value = sownData.value.map((item) => item.year);
    outputData.value = res[1].data;
    outputYears.value = outputData.value.map((item) => item.year);
    perHectareData.value = res[2].data;
    perHectareYears.value = perHectareData.value.map((item) => item.year);
  }

  console.log(sownData.value, outputData.value, perHectareData.value);
});
</script>

<template>
  <Carousel
    class="story-carousel story-carousel--colors h-full"
    :hideArrows="false"
    hideArrowsOnBound
    ><slide class="story-carousel__slide h-full">
      <TreeMapCharts
        :data="sownData"
        :years="sownYears"
        :classify="'播种面积'"
      ></TreeMapCharts> </slide
    ><slide class="story-carousel__slide h-full">
      <TreeMapCharts
        :data="outputData"
        :years="outputYears"
        :classify="'总产量'"
      ></TreeMapCharts> </slide
    ><slide class="story-carousel__slide h-full">
      <TreeMapCharts
        :data="perHectareData"
        :years="perHectareYears"
        :classify="'单位面积产量'"
      ></TreeMapCharts> </slide
  ></Carousel>
</template>
<style scoped>
::v-deep .vs-carousel__wrapper {
  height: 100%;
}

::v-deep .vs-carousel__arrows {
  background-color: #F3F4F6;
  color:#374151
}
</style>
