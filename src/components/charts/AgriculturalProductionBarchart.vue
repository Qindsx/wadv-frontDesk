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
import { onMounted, Ref, ref, provide, watchEffect, watch } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

import { CategoryValueType } from '../../types/AgriculturalInputsOutputsController';

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');
const option: Ref<ECBasicOption> = ref({});
const AgriculturalProductionRef: Ref<echarts.ECharts | null> = ref(null);
const props = defineProps<{ years: string[]; data: number[],name:string }>();

watch(
  () => props,
  () => {
    option.value = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'item',
      },
      backgroundColor: 'rgba(0,0,0,0)',
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          data: props.years,
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            margin: 10,
            // color: '#05D5FF',
            color: 'rgb(170,170,170)',
            textStyle: {
              fontSize: 11,
            },
            rotate: '45',
          },
          axisLine: {
            lineStyle: {
              color: '#0c3b71',
            },
          },
          // axisLabel: {
          //   show: true,
          //   color: 'rgb(170,170,170)',
          //   fontSize: 16,
          // },
        },
      ],
      yAxis: [
        {
          show: false,
          type: 'value',
          name: '单位:户',
          nameTextStyle: {
            color: 'rgb(170,170,170)',
          },
          gridIndex: 0,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          // min: min,
          // max: 100,
          axisLine: {
            lineStyle: {
              color: '#0c3b71',
            },
          },
          axisLabel: {
            color: 'rgb(170,170,170)',
            formatter: '',
          },
        },
        {
          show:false,
          type: 'value',
          gridIndex: 0,
          min: 50,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
            },
          },
        },
      ],
      series: [
        {
          data: props.data,
          type: 'line',
          smooth: true
        },
        {
          name: props.name,
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              label: {
                show: false, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: 'rgb(170,170,170)',
                  fontSize: 12,
                },
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#00feff',
                },
                {
                  offset: 0.5,
                  color: '#027eff',
                },
                {
                  offset: 1,
                  color: '#0286ff',
                },
              ]),
            },
          },
          data: props.data,
          zlevel: 11,
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: '50%',
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: '-135%',
          data: new Array(props.data.length).fill(100),
          tooltip:{
            show:false
          },
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
          
          zlevel: 9,
        },
      ],

      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '0',
        height: '85%',
        containLabel: true,
        z: 22,
      },
    };
  },
  { deep: true, immediate: true }
);
window.addEventListener('resize', () => {
  AgriculturalProductionRef.value?.resize();
});
</script>

<template>
  <div class="h-full opacity-80">
    <v-chart ref="AgriculturalProductionRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
