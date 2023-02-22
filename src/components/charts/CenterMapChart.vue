<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { MapChart } from 'echarts/charts';
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

import wuhanMapData from './data/wuhanMapData';

use([
  GridComponent,
  CanvasRenderer,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const option: Ref<ECBasicOption> = ref({});
const EmploymentTrendsRef: Ref<echarts.ECharts | null> = ref(null);

// EmploymentTrendsRef.value?.showLoading();
onMounted(async () => {
  console.log(wuhanMapData.wuhanMapData);
  echarts.registerMap('wuhan', wuhanMapData.wuhanMapData);

  option.value = {
    tooltip: {
      show:false,
      trigger: 'item',
    },
    backgroundColor: 'rgba(0,0,0,0)',
    geo: {
      map: 'wuhan',
      aspectScale: 0.9, //长宽比
      zoom: 1.2,

      silent: true,
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#013C62',
          shadowColor: '#182f68',
          shadowOffsetX: 0,
          shadowOffsetY: 25,
        },
        emphasis: {
          areaColor: '#2AB8FF',
          borderWidth: 0,
          color: 'green',
          label: {
            show: false,
          },
        },
      },
    },
    series: [
      {
        type: 'map',
        roam: false,
        silent: true,
        label: {
          show:false,
        },

        itemStyle: {
          normal: {
            borderColor: '#2ab8ff',
            borderWidth: 1.5,
            areaColor: '#12235c',
          },
          emphasis: {
            areaColor: '#2AB8FF',
            borderWidth: 0,
            color: 'green',
          },
        },
        zoom: 1.2,
        map: 'wuhan', //使用
        // data: this.difficultData //热力图数据   不同区域 不同的底色
      },
      // {
      //   type: 'effectScatter',
      //   coordinateSystem: 'geo',
      //   showEffectOn: 'render',
      //   rippleEffect: {
      //     period: 15,
      //     scale: 4,
      //     brushType: 'fill',
      //   },
      //   hoverAnimation: true,
      //   itemStyle: {
      //     normal: {
      //       color: '#ffff',
      //       shadowBlur: 10,
      //       shadowColor: '#333',
      //     },
      //   },
      //   data: mapDate,
      // },
    ],
  };
});

window.addEventListener('resize', () => {
  EmploymentTrendsRef.value?.resize();
});
</script>

<template>
  <div class="h-full opacity-80">
    <v-chart ref="EmploymentTrendsRef" class="chart " :option="option" />
  </div>
</template>
<style scoped></style>
<style scoped></style>
