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

import { FisheryProductionType } from '../../types/AgriculturalProductionController';

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const fishCaughtData = ref<any>([]);
const fishArtificiallyData = ref<any>([]);
const fishCulturedData = ref<any>([]);

const fishData = ref<number[][]>([]);
const shellfhshData = ref<number[][]>([]);
const otherData = ref<number[][]>([]);
const shrimpsData = ref<number[][]>([]);

const props = defineProps<{
  years: string[];
  data: FisheryProductionType[];
}>();

const option: Ref<ECBasicOption> = ref({});
const FisheryProductionRef: Ref<echarts.ECharts | null> = ref(null);

watch(
  () => props,
  () => {
    props.data.forEach((item) => {
      fishData.value.push([
        item.fishCaught,
        item.fishArtificially,
        item.fishCultured,
      ]);
      shellfhshData.value.push([
        item.shellfhshCaught,
        item.shellfhshArtificially,
        item.shellfhshCultured,
      ]);
      shrimpsData.value.push([
        item.shrimpsCaught,
        item.shrimpsArtificially,
        item.shrimpsCultured,
      ]);
      otherData.value.push([
        item.otherCaught,
        item.otherArtificially,
        item.otherCultured,
      ]);
    });
    option.value = {
      title: {
        text: '渔业生产产量',
        left: 'center',
        textStyle: {
          color: '#EEF2FF',
          fontWeight: 'bold',
          fontSize: '32',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        top: '46',
        textStyle: {
          color: '#EEF2FF',
          textBorderColor: 'inherit',
          position: 'insideTop',
        },
      },
      grid: {
        top:"35%",
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        // {
        //   type: 'category',
        //   data: ['2019', '2020', '2019', '2020', '2019', '2020'],
        // },
        {
          type: 'category',
          data: ['淡水捕捞产量', '淡水养殖产量', '增值养殖产量'],
          position: 'bottom',
        },
      ],
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '2019年鱼类',
          type: 'bar',
          stack: '2019',
          // label: {
          //   show: true,
          // },
          emphasis: {
            focus: 'series',
          },
          markPoint: {
            label: {
              color: '#EEF2FF',
              textBorderColor: 'inherit',
              position: 'insideTop',
            },
            data: [
              {
                name: '2019淡水捕捞产量',
                value: '2019年产量：' + props.data[0].fishCaughtAll + '吨',
                xAxis: 0,
                yAxis: props.data[0].fishCaughtAll,
              },
              {
                name: '2019淡水养殖产量',
                value: '2019年产量：' + props.data[0].fishArtificiallyAll + '吨',
                xAxis: 1,
                yAxis: props.data[0].fishArtificiallyAll,
              },
              {
                name: '2019增值养殖产量',
                value: '2019年产量：' + props.data[0].fishCulturedAll + '吨',
                xAxis: 2,
                yAxis: props.data[0].fishCulturedAll,
              },
            ],
          },
          data: fishData.value[0],
        },
        {
          name: '2019年虾蟹类',
          type: 'bar',
          stack: '2019',
          // label: {
          //   show: true,
          // },
          emphasis: {
            focus: 'series',
          },
          data: shrimpsData.value[0],
        },
        {
          name: '2019年贝类',
          type: 'bar',
          stack: '2019',
          // label: {
          //   show: true,
          // },
          emphasis: {
            focus: 'series',
          },
          data: shellfhshData.value[0],
        },
        {
          name: '2019年其他类',
          type: 'bar',
          stack: '2019',
          // label: {
          //   show: true,
          // },
          emphasis: {
            focus: 'series',
          },
          data: otherData.value[0],
        },
        {
          name: '2020年鱼类',
          type: 'bar',
          stack: '2020',
          // label: {
          //   show: true,
          // },

          markPoint: {
            label: {
              color: '#EEF2FF',
              textBorderColor: 'inherit',

              position: 'insideBottom',
            },
            data: [
              {
                name: '2020年淡水捕捞产量',
                value: '2020年产量：' + props.data[1].fishCaughtAll + '吨',
                xAxis: 0,
                yAxis: props.data[1].fishCaughtAll,
              },
              {
                name: '2020淡水养殖产量',
                value: '2020年产量：' + props.data[1].fishArtificially + '吨',
                xAxis: 1,
                yAxis: props.data[1].fishArtificially,
              },
              {
                name: '2020增值养殖产量',
                value: '2020年产量：' + props.data[1].fishCulturedAll + '吨',
                xAxis: 2,
                yAxis: props.data[1].fishCulturedAll,
              },
            ],
          },
          emphasis: {
            focus: 'series',
          },
          data: fishData.value[1],
        },
        {
          name: '2020年虾蟹类',
          type: 'bar',
          stack: '2020',
          // label: {
          //   show: true,
          // },

          emphasis: {
            focus: 'series',
          },
          data: shrimpsData.value[1],
        },
        {
          name: '2020年贝类',
          type: 'bar',
          stack: '2020',
          // label: {
          //   show: true,
          // },
          emphasis: {
            focus: 'series',
          },
          data: shellfhshData.value[1],
        },
        {
          name: '2020年其他类',
          type: 'bar',
          stack: '2020',
          // label: {
          //   show: true,
          // },
          emphasis: {
            focus: 'series',
          },
          data: otherData.value[1],
        },
      ],
    };
  },
  { deep: true }
);

window.addEventListener('resize', () => {
  FisheryProductionRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="FisheryProductionRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
