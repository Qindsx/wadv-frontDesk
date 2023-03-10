<script setup lang="ts">
import { AgricultureMechanizationType } from '../../types/AgriculturalInputsOutputsController';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
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

use([
  GridComponent,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const props = defineProps<{
  years: string[];
  agricultureMechanizationData: AgricultureMechanizationType[];
}>();
const option1: Ref<ECBasicOption> = ref({});
const option2: Ref<ECBasicOption> = ref({});
const AgricultureMechanization1Ref: Ref<echarts.ECharts | null> = ref(null);
const AgricultureMechanization2Ref: Ref<echarts.ECharts | null> = ref(null);
const agricultureMechanizationData2019: Ref<AgricultureMechanizationType | {}> =
  ref({});
const agricultureMechanizationData2020: Ref<AgricultureMechanizationType | {}> =
  ref({});
const agricultureMechanizationDataName = ref({
  largeTractors: '大中型拖拉机(台)',
  largeMachinery: '配套农具(部)',
  miniTractors: '小型及手扶拖拉机(台)',
  miniMachinery: '配套农具(部)',
  pumps: '农用水泵(台)',
  combine: '联合收割机',
  motorizedThresher: '机动脱粒机(台)',
});

watch(
  () => props,
  () => {
    agricultureMechanizationData2019.value = props.agricultureMechanizationData[0]
    agricultureMechanizationData2020.value = props.agricultureMechanizationData[1]
    option1.value = {
      legend: {
        top: '32',
      },
      title: {
        text: '农业机械总动力占比',
        left: 'center',
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} 万元 ({d}%)',
      },
      backgroundColor: 'rgba(0,0,0,0)',
      grid: {
        left: '13%',
        right: '14%',
        bottom: '3%',
        containLabel: true,
      },
      series: [
        {
          name: '2020年农业产值分类',
          type: 'pie',
          top: '25%',
          radius: [29, 80],
          center: ['50%', '50%'],
          // roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          labelLine: { smooth: 0.6 },
          data: [
            {
              value: props.agricultureMechanizationData[1].dieselEngines,
              name: '柴油发动机',
            },
            {
              value: props.agricultureMechanizationData[1].gasolineEngines,
              name: '汽油发动机',
            },
          ],
        },
      ],
    };

    option2.value = {
      legend: {
        top: '26',
      },
      title: {
        text: '各类机械动力占比',
        left: 'center',
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} 万千瓦 ({d}%)',
      },
      backgroundColor: 'rgba(0,0,0,0)',
      // grid: {
      //   left: '3%',
      //   right: '5%',
      //   bottom: '3%',
      //   top:'14%',
      //   // containLabel: true,
      // },
      series: [
        {
          name: '2020年农业产值分类',
          type: 'pie',
          radius: [29, 80],
          center: ['50%', '50%'],
          // roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          label: {
            show: false,
          },

          top: '25%',
          labelLine: { smooth: 0.6 },
          data: [
            {
              value: props.agricultureMechanizationData[1].largePower,
              name: '大中型拖拉机',
            },
            {
              value: props.agricultureMechanizationData[1].miniPowers,
              name: '小型及手扶拖拉机',
            },
            {
              value: Number(
                (
                  props.agricultureMechanizationData[1].combinePower / 10000
                ).toFixed()
              ),
              name: '联合收割机',
            },
          ],
        },
      ],
    };
  },
  { deep: true }
);

window.addEventListener('resize', (e) => {
  AgricultureMechanization1Ref.value?.resize();
  AgricultureMechanization2Ref.value?.resize();
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
  <div class="grid grid-cols-4 h-full">
    <div class="col-span-1">
      <!-- <p class="text-center text-xl font-semibold text-gray-400">农业机械总动力占比</p> -->
      <v-chart
        ref="AgricultureMechanization1Ref"
        class="chart"
        :option="option1"
      />
    </div>
    <div class="col-span-2 flex flex-col">
      <p class="text-center text-3xl text-gray-400 font-medium">
        农业机械化情况
      </p>
      <div class="flex-1 flex  p-2 ">
        <div class="w-32 flex justify-evenly flex-col text-center">
          <p class="text-xl text-gray-400">名称</p>
          <p class="text-xl text-gray-400">2019</p>
          <p class="text-xl text-gray-400">2020</p>
          <p class="text-xl text-gray-400">增长率</p>
        </div>
        <div class="flex flex-nowrap overflow-x-auto">
          <div
            class="flex-none flex justify-evenly flex-col w-24 text-center font-normal"
            v-for="(value, key, index) in agricultureMechanizationDataName"
            :key="key"
            :class="Number(index) % 2 == 0 ? ' line-bg-0' : ''"
          >
            <p class="text-sm">{{ value }}</p>
            <p class="text-lg">{{ agricultureMechanizationData2019[key] }}</p>
            <p class="text-lg">{{ agricultureMechanizationData2020[key] }}</p>
            <div class="flex self-center justify-evenly text-lg">
              <img
                :src="`/${
                  agricultureMechanizationData2019[key] -
                    agricultureMechanizationData2020[key] <
                  0
                    ? 'up'
                    : agricultureMechanizationData2019[key] -
                        agricultureMechanizationData2020[key] ==
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
                    agricultureMechanizationData2019[key],
                    agricultureMechanizationData2020[key]
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-1">
      <v-chart
        ref="AgricultureMechanization2Ref"
        class="chart"
        :option="option2"
      />
    </div>
  </div>
</template>
<style scoped>
.line-bg-0 {
  background-color: rgb(19, 41, 76);
}
</style>
