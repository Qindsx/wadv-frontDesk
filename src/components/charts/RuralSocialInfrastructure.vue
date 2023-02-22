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
import { ref, provide } from 'vue';

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const props = defineProps({
  years: Array,
  villagesBroad: Array,
  villagesPropBroad: Array,
  villagesPropTv: Array,
  villagesPropWater: Array,
  villagesTv: Array,
  villagesWater: Array,
});

console.log(props);

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
  tooltip: {
    trigger: 'item',
    // formatter: `{a} <br/>{b} : {c}
    //  (占全部委员会占比 80%)`,
  },
  legend: {
    // formatter: 'Legend {name} asd'
  },
  xAxis: {
    type: 'category',
    data: props.years,
  },

  backgroundColor: 'rgba(0,0,0,0)',
  yAxis: {

    boundaryGap: false,
  },
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    {
      name: '自来水受益村数(个)',
      type: 'bar',
      barMaxWidth:"10%",
      data: props.villagesWater,
      itemStyle:{
        borderRadius:10
      },
      label: {
        formatter: `{c}/n占全部委员会占比 ${props.villagesPropWater}%'`,
      },
    },
    {
      name: '通有线电视村数(个)',
      type: 'bar',
      barMaxWidth: "10%",
      data: props.villagesTv,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        formatter: `{c}/n占全部委员会占比 ${props.villagesPropTv}%`,
      },
    },
    {
      name: '通宽带村数(个)',
      type: 'bar',
      barMaxWidth: "10%",

      itemStyle:{
        borderRadius:10
      },
      data: props.villagesBroad,
      label: {
        formatter: `{c}/n占全部委员会占比 ${props.villagesPropBroad}%`,
      },
    },
  ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
});
</script>

<template>
  <div class="h-full"><v-chart class="chart" :option="option" /></div>

</template>
<style scoped></style>
