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

import { ForestryProductionType } from '../../types/AgriculturalProductionController';

use([
  GridComponent,
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
const props = defineProps<{
  years: string[];
  data: any[];
}>();

const option: Ref<ECBasicOption> = ref({});
const FruitProductionRef: Ref<echarts.ECharts | null> = ref(null);
watch(
  () => props,
  () => {
    option.value = {
      backgroundColor: 'rgba(0,0,0,0)',
      title: {
        text: '水果生产面积',
        left: 'center',
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} (亩)',
      },
      legend: {
        top: '26',
        textStyle: {
          color: '#EEF2FF',
          textBorderColor: 'inherit',
          position: 'insideTop',
        },
        // formatter: 'Legend {name} asd'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,

        data: ['柑橘', '猕猴桃', '葡萄', '梨子', '桃子'],
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
      },

      yAxis: {
        boundaryGap: false,
      },
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          name: '2019',
          type: 'bar',
          barMaxWidth: '20%',
          data: [
            props.data[0]?.citrusArea,
            props.data[0]?.kiwiArea,
            props.data[0]?.grapesArea,
            props.data[0]?.pearsArea,
            props.data[0]?.peachsArea,
          ],
          // markPoint: {
          //   label: {
          //     position: 'left',
          //   },
          //   // markLine 也是同理
          //   data: [
          //     {
          //       type: 'min',
          //       symbol: 'pin',
          //     },
          //   ],
          // },
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            formatter: `{a} <br/>{b}(亩) : {c}`,
          },
        },
        {
          name: '2020',
          type: 'bar',
          barMaxWidth: '20%',
          data: [
            props.data[1]?.citrusArea,
            props.data[1]?.kiwiArea,
            props.data[1]?.grapesArea,
            props.data[1]?.pearsArea,
            props.data[1]?.peachsArea,
          ],
          // markPoint: {
          //   // markLine 也是同理
          //   label: {
          //     position: 'right',
          //   },
          //   data: [
          //     {
          //       type: 'min',
          //       symbol: 'pin',
          //     },
          //   ],
          // },
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            formatter: `{a} <br/>{b}(亩) : {c}`,
          },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    };
  },
  { deep: true }
);

window.addEventListener('resize', () => {
  FruitProductionRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="FruitProductionRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
