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
import { onMounted, Ref, ref, provide, watch } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

import { productionValueInfoByYears } from '../../api/home';
import { GrossIndicesgross3Datum } from '../../types/RuralandAgriculturalBasicInformation';

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
const EmploymentTrendsRef: Ref<echarts.ECharts | null> = ref(null);

// 农业总产值
const farmings: Ref<Number[]> = ref([]);
// 年份
const years: Ref<String[]> = ref([]);

const props = defineProps<{
  productionValueInfo: GrossIndicesgross3Datum[];
}>();

watch(
  () => props.productionValueInfo,
  () => {
    props.productionValueInfo.forEach((item) => {
      farmings.value.push(item.grossOutputValue);
      years.value.push(item.year);
    });
    let zoomShow = false;
    if (years.value.length > 14) {
      zoomShow = true;
    } else {
      zoomShow = false;
    }

    option.value = {
      backgroundColor: 'rgba(0,0,0,0)',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: '6%',
        right: '5%',
        left: '14%',
        bottom: '12%',
      },
      xAxis: [
        {
          type: 'category',
          data: years,
          axisLine: {
            lineStyle: {
              color: 'rgba(66, 192, 255, .3)',
            },
          },
          axisLabel: {
            interval: 0,
            margin: 10,
            color: '#05D5FF',
            textStyle: {
              fontSize: 11,
            },
            rotate: '45',
          },
          axisTick: {
            //刻度
            show: false,
          },
        },
      ],
      yAxis: {
        name: '产值(万元)',
        axisLabel: {
          padding: [3, 0, 0, 0],
          formatter: '{value}',
          color: 'rgba(95, 187, 235, 1)',
          textStyle: {
            fontSize: 11,
          },
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 192, 255, .3)',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0)',
          },
        },
      },

      dataZoom: [
        //滚动条
        {
          show: zoomShow,
          type: 'inside',
          realtime: true,
          start: 80,
          end: 100,
          xAxisIndex: [0],
          bottom: '10',
          left: '30',
          height: 10,
          borderColor: 'rgba(0,0,0,0)',
          textStyle: {
            color: '#05D5FF',
          },
        },
      ],
      series: [
        {
          type: 'bar',
          data: farmings,
          barWidth: '10',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(5, 213, 255, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 0.98,
                    color: 'rgba(5, 213, 255, 0)', // 100% 处的颜色
                  },
                ],
                false
              ),
              shadowColor: 'rgba(5, 213, 255, 1)',
              shadowBlur: 4,
            },
          },
          label: {
            normal: {
              show: true,
              lineHeight: 10,
              formatter: '{c}',
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 10,
              },
            },
          },
        },
      ],
    };
  }
);

window.addEventListener('resize', () => {
  EmploymentTrendsRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="GrossAgriculturalOutputRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
