<script setup lang="ts">
import { Carousel, Slide } from 'vue-snap';
import 'vue-snap/dist/vue-snap.css';
import { TreeMapCharts } from '../charts';

import { cropProductionByYears } from '../../api/agriculturalProduction';
import { SownOutputPerHectareType } from '../../types/AgriculturalProductionController';
import { onMounted } from 'vue';

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

  console.log(res);
});
</script>

<template>
  <div>
    <Carousel
      class="story-carousel story-carousel--colors"
      :hideArrows="false"
      hideArrowsOnBound
      ><slide class="story-carousel__slide">
        <TreeMapCharts></TreeMapCharts> </slide
    ></Carousel>
  </div>
</template>
<style scoped></style>
