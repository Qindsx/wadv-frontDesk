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
  data: ForestryProductionType[];
}>();

const option: Ref<ECBasicOption> = ref({});
const ForestryProductionRef: Ref<echarts.ECharts | null> = ref(null);

watch(
  () => props,
  () => {
    option.value = {
      backgroundColor: 'rgba(0,0,0,0)',
      title: {
        text: '林业生产面积',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} (千公顷)',
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

        data: [
          '荒山、荒沙造林',
          '有林地造林',
          '更新改造',
          '四旁零星植树',
          '森林抚育面积',
          '育苗',
        ],
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
            props.data[0]?.barrenMountain,
            props.data[0]?.forestAfforestation,
            props.data[0]?.reforestationArea,
            props.data[0]?.scatteredTreePlanging,
            props.data[0]?.forestTendingArea,
            props.data[0]?.seedlingArea,
          ],
          markPoint: {
            label: {
              position: 'left'
            },
            // markLine 也是同理
            data: [
              {
                type: 'min',
                symbol: 'pin',
              },
            ]
          },
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            formatter: `{a} <br/>{b}(千公顷) : {c}`,
          },
        },
        {
          name: '2020',
          type: 'bar',
          barMaxWidth: '20%',
          data: [
            props.data[0]?.barrenMountain,
            props.data[0]?.forestAfforestation,
            props.data[0]?.reforestationArea,
            props.data[0]?.scatteredTreePlanging,
            props.data[0]?.forestTendingArea,
            props.data[0]?.seedlingArea,
          ],
          markPoint: {
            // markLine 也是同理
            label:{
              position:'right'
            },
            data: [
              {
                type: 'min',
                symbol: 'pin',
              },
            ]
          },
          itemStyle: {
            borderRadius: 10,
          },
          // label: {
          //   formatter: `{c}/n占全部委员会占比 ${props.villagesPropWater}%'`,
          // },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    };
    // agriculturalInvestmentData2019.value = props.agriculturalInvestmentData[0];
    // agriculturalInvestmentData2020.value = props.agriculturalInvestmentData[1];
    // console.log(agriculturalInvestmentData2019.value);
    // console.log(agriculturalInvestmentData2020.value);
  },
  { deep: true }
);

window.addEventListener('resize', () => {
  ForestryProductionRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="ForestryProductionRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
