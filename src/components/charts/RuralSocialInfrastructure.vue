<!-- 4 -2农村社会基础设施  -->
<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref } from 'vue';

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

// provide(THEME_KEY, 'dark');

const chartData = [
  ['product', '2019年', '2020年'],
  ['自来水受益村数(个)', 1888, 1908],
  ['通有线电视村数(个),', 1889, 1909],
  ['通宽带村数(个)', 1889, 1909],
];

const option = ref({
  // // title: {
  // //   text: 'Traffic Sources',
  // //   left: 'center',
  // // },
  // // tooltip: {
  // //   trigger: 'item',
  // //   formatter: '{a} <br/>{b} : {c} ({d}%)',
  // // },
  legend: {
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['自来水受益村数(个)', '通有线电视村数(个)', '通宽带村数(个)'],
  },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    { 
      name:'2019年',
      type: 'bar',
      radius: '55%',
      center: ['50%', '60%'],
      data: [1888, 1889, 1889],
    },
    {
      name:'2020年',
      type: 'bar',
      radius: '55%',
      center: ['50%', '60%'],
      data: [1908, 1909, 1909],
    },
  ],
});
</script>

<template>
  <div><v-chart class="chart" :option="option" /></div>
</template>
<style scoped>
.chart {
  height: 400px;
}
</style>
