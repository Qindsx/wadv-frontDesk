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

import { productionValueAndCompositionInfoByYears } from '../../api/home';
import { GrossOutputCompoosition4Type } from '../../types/RuralandAgriculturalBasicInformation';

use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);


provide(THEME_KEY, "dark");

const OutputCompositionRef = ref<echarts.ECharts | null>();

const option: Ref<ECBasicOption> = ref({});

provide(THEME_KEY, "dark");

onMounted(async () => {
  const res = await productionValueAndCompositionInfoByYears({ year: [] });
  const years = res.data?.map((item) => item.year);
  const farmings = res.data?.map((item) => item.farming);
  option.value = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    // title: {
    //   text: 'Gradient Stacked Area Chart',
    // },

    backgroundColor: "rgba(0,0,0,0)",
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      padding: 2,
      left:'0',
      itemGap:2,
      data: [
        '农业产值',
        '林业产值',
        '牧业产值',
        '渔业产值',
        '农业总产值',
      ],
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    grid: {
      left: '0',
      right: '14',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      nameLocation: 'right',
      data: years,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: '产值(万元)'
    },

    series: [
      {
        name: '农业总产值',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 215, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: farmings,
      },
      {
        name: '林业产值',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: res.data?.map((item) => item.forestry),
      },
      {
        name: '牧业产值',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)',
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: res.data?.map((item) => item.husbandry),
      },
      {
        name: '渔业产值',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)',
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: res.data?.map((item) => item.fishery),
      },
      {
        name: '农业产值',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)',
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: res.data?.map((item) => item.industrialService),
      },
    ],
  };
});

window.addEventListener('resize', (e) => {
  OutputCompositionRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="OutputCompositionRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
