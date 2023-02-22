<!-- 农业从业人员折线 -->
<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { onMounted, Ref, ref, provide } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

// interface EmploymentTrendsDataType {
//   agriculturalLaborers: number[];
//   agricultureEmployees: number[];
//   noAgriculturalLaborers: number[];
//   noAgricultureEmployees: number[];
// }

const names = [];

const props = defineProps({
  years: Array,
  agriculturalLaborers: Array,
  agricultureEmployees: Array,
  noAgriculturalLaborers: Array,
  noAgricultureEmployees: Array,
});

const option: Ref<ECBasicOption> = ref({});
const EmploymentTrendsRef: Ref<echarts.ECharts | null> = ref(null);

onMounted(async () => {
  console.log(props);
  option.value = {
    // title: {
    //   text: 'Stacked Line',
    // },
    tooltip: {
      trigger: 'axis',
    },

    backgroundColor: 'rgba(0,0,0,0)',
    legend: {
      data: [
        '乡村农业从业人员',
        '乡村非农业从业人员',
        '国营农业从业人员',
        '国营非农业从业人员',
      ],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.years,
    },
    yAxis: {
      type: 'value',

      scale: true,
    },
    series: [
      {
        name: '乡村农业从业人员',
        type: 'line',
        data: props.agricultureEmployees || [],
      },
      {
        name: '乡村非农业从业人员',
        type: 'line',
        data: props.noAgricultureEmployees || [],
      },
      {
        name: '国营农业从业人员',
        type: 'line',
        data: props.agriculturalLaborers || [],
      },
      {
        name: '国营非农业从业人员',
        type: 'line',
        data: props.noAgriculturalLaborers || [],
      },
    ],
  };
});

window.addEventListener('resize', () => {
  EmploymentTrendsRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="EmploymentTrendsRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
