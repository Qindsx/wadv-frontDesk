<script setup lang="ts">
import { AgriculturalInvestmentType } from '../../types/AgriculturalInputsOutputsController';
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
import { onMounted, Ref, ref, provide, inject, watchEffect, watch } from 'vue';
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
const AgriculturalInvestmentRef: Ref<echarts.ECharts | null> = ref(null);

const props = defineProps<{
  years: string[];
  agriculturalInvestmentData: AgriculturalInvestmentType[];
}>();

const agriculturalInvestmentData2019: Ref<AgriculturalInvestmentType | {}> =
  ref({});
const agriculturalInvestmentData2020: Ref<AgriculturalInvestmentType | {}> =
  ref({});

const agriculturalInvestmentDataName = ref<any>({
  electricityRuralArea: '农村用电量(万千瓦小时)',
  nitrogenousFertilizer: '氮肥(吨)',
  phosphateFertilizer: '磷肥(吨)',
  potashFertilizer: '钾肥(吨)',
  compoundFertilizer: '复合肥(吨)',
  mulchFilm: '塑料地膜(吨)',
  mulchFilmArea: '地膜面积(千公顷)',
  comsumptionPesticide: '农用柴油(吨)',
  agriculturalDieselOil: '农药使用量(吨)',
});
watch(
  () => props,
  () => {
    option.value = {
      backgroundColor: 'rgba(0,0,0,0)',
      title: {
        text: '农田水利建设面积',
        left: 'center',
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} 万千瓦 ({d}%)',
      },
      legend: {
        top: '26',
        // formatter: 'Legend {name} asd'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['有效灌溉', '旱涝保收', '机电排灌'],
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
            props.agriculturalInvestmentData[0]?.effectiveIrrigationArea,
            props.agriculturalInvestmentData[0]?.floodDroughtArea,
            props.agriculturalInvestmentData[0]?.pumpedIrrigationArea,
          ],
          itemStyle: {
            borderRadius: 10,
          },
          // label: {
          //   formatter: `{a} <br/>{b}(千公顷) : {c}`,
          // },
        },
        {
          name: '2020',
          type: 'bar',
          barMaxWidth: '20%',
          data: [
            props.agriculturalInvestmentData[1]?.effectiveIrrigationArea,
            props.agriculturalInvestmentData[1]?.floodDroughtArea,
            props.agriculturalInvestmentData[1]?.pumpedIrrigationArea,
          ],
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
    agriculturalInvestmentData2019.value = props.agriculturalInvestmentData[0];
    agriculturalInvestmentData2020.value = props.agriculturalInvestmentData[1];
    console.log(agriculturalInvestmentData2019.value);
    console.log(agriculturalInvestmentData2020.value);
  },
  { deep: true }
);

window.addEventListener('resize', (e) => {
  AgriculturalInvestmentRef.value?.resize();
});
const getGrowthRate = (a: number, b: number): string => {
  if (a && b) {
    return (((b - a) / a) * 100).toFixed(2) + '%';
  } else {
    return '无数据';
  }
};
</script>

<template>
  <div class="h-full flex">
    <div class="h-full w-1/3">
      <v-chart ref="AgriculturalInvestmentRef" class="chart" :option="option" />
    </div>
    <div class="flex-1 flex flex-col w-2/3">
      <p class="text-center text-3xl text-gray-400 font-medium">
        农业生产条件与农业投入
      </p>
      <div class="flex h-full p-2 w-full">
        <div class="w-32 flex justify-evenly flex-col text-center">
          <p class="text-xl text-gray-400">名称</p>
          <p class="text-xl text-gray-400">2019</p>
          <p class="text-xl text-gray-400">2020</p>
          <p class="text-xl text-gray-400">增长率</p>
        </div>
        <div class=" flex flex-nowrap  overflow-x-auto">
          <div
            class=" flex-none flex  justify-evenly flex-col w-24 text-center font-normal"
            v-for="(value, key, index) in agriculturalInvestmentDataName"
            :key="key"
            
          :class="Number(index) % 2 == 0 ? ' line-bg-0' : ''"
          >
            <p class="text-sm">{{ value }}</p>
            <p class="text-lg">{{ agriculturalInvestmentData2019[key] }}</p>
            <p class="text-lg">{{ agriculturalInvestmentData2020[key] }}</p>
            <div class="flex self-center justify-evenly text-lg">
              <img
                :src="`/src/assets/img/${
                  agriculturalInvestmentData2019[key] -
                    agriculturalInvestmentData2020[key] <
                  0
                    ? 'up'
                    : agriculturalInvestmentData2019[key] -
                        agriculturalInvestmentData2020[key] ==
                      0
                    ? 'notChange'
                    : 'down'
                }.svg`"
                alt=""
                width="25"
                height="25"
              />
              <p class="self-center">
                {{
                  getGrowthRate(
                    agriculturalInvestmentData2019[key],
                    agriculturalInvestmentData2020[key]
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.line-bg-0 {
  background-color: rgb(19, 41, 76);
}
</style>
