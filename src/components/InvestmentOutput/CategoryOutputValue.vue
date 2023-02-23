<script setup lang="ts">
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
import { onMounted, Ref, ref, provide,nextTick } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

import { categoryOutputValueByYears } from '../../api/investmentOutput';
import { CategoryValuePieChart } from '../charts';
import {
  CategoryValueType,
  FarmingCategoryValueType,
  CategoryOutputValueDatum,
} from '../../types/AgriculturalInputsOutputsController';

use([
  GridComponent,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const years: Ref<string[]> = ref([]);
const categoryValues: Ref<CategoryValueType[]> = ref([]);
const farmingcategoryValues: Ref<FarmingCategoryValueType[]> = ref([]);

const option1: Ref<ECBasicOption> = ref({});
const CategoryValuePieRef: Ref<echarts.ECharts | null> = ref(null);

const farmingCategory: Ref<any> = ref({
  beans: '豆类',
  cereal: '谷物',
  cotton: '棉花',
  fiberCrops: '麻类',
  flower: '花卉园艺',
  herbCrops: '药材',
  oilCrops: '油料',
  otherCrops: '其他农作物',
  sugarCrops: '糖料',
  teaFruit: '茶、桑、果',
  tobacco: '烟叶',
  tuberCrops: '薯类',
  vagetable: '蔬菜及菌类',
  wildPlants: '野生植物',
});

const categoryOutputValueInfo: Ref<CategoryOutputValueDatum[]> = ref([]);

onMounted(async () => {
  const res = await categoryOutputValueByYears({ year: ['2019', '2020'] });
  res.data.forEach((item, i) => {
    years.value.push(item.year);
    // categoryValues.value[i].farming = item.farming;
    // categoryValues.value[i].forestry = item.forestry;
    // categoryValues.value[i].animalHusbandry = item.animalHusbandry;
    // categoryValues.value[i].fishery = item.fishery;
    // categoryValues.value[i].industrialService = item.industrialService;

    // farmingcategoryValues.value[i].beans = item.beans;
    // farmingcategoryValues.value[i].cereal = item.cereal;
    // farmingcategoryValues.value[i].cotton = item.cotton;
    // farmingcategoryValues.value[i].fiberCrops = item.fiberCrops;
    // farmingcategoryValues.value[i].flower = item.flower;
    // farmingcategoryValues.value[i].herbCrops = item.herbCrops;
    // farmingcategoryValues.value[i].oilCrops = item.oilCrops;
    // farmingcategoryValues.value[i].otherCrops = item.otherCrops;
    // farmingcategoryValues.value[i].sugarCrops = item.sugarCrops;
    // farmingcategoryValues.value[i].teaFruit = item.teaFruit;
    // farmingcategoryValues.value[i].tobacco = item.tobacco;
    // farmingcategoryValues.value[i].tuberCrops = item.tuberCrops;
    // farmingcategoryValues.value[i].vagetable = item.vagetable;
    // farmingcategoryValues.value[i].wildPlants = item.wildPlants;
    
  });
  await nextTick()
  categoryOutputValueInfo.value = res.data
  console.log(categoryOutputValueInfo.value);
  option1.value = {
    legend: {
      top: 'top',
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
        radius: [60, 200],
        center: ['50%', '50%'],
        // roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        labelLine: { smooth: 0.6 },
        data: [
          { value: res.data[1].farming, name: '农业产值' },
          { value: res.data[1].forestry, name: '林业产值' },
          { value: res.data[1].animalHusbandry, name: '牧业产值' },
          { value: res.data[1].fishery, name: '渔业产值' },
          {
            value: res.data[1].industrialService,
            name: '农林渔牧服务业产值',
          },
        ],
      },
    ],
  };
  console.log(res.data[1]);
});

window.addEventListener('resize', () => {
  CategoryValuePieRef.value?.resize();
});
</script>

<template>
  <div class="h-full grid grid-cols-3">
    <div class="col-span-2 h-full">
      <v-chart ref="CategoryValuePieRef" class="chart" :option="option1" />
    </div>
    <div class="col-span-1 overflow-y-auto">
      <!-- <v-chart ref="CategoryValuePieRef" class="chart" :option="option1" /> -->
      <!-- 表头 -->
      <div class="flex text-center text-zinc-400">
        <div class="flex-1">名称</div>
        <div class="flex-1">2019年</div>
        <div class="flex-1">2020年</div>
        <div class="flex-1">增长率</div>
      </div>
      <div class="h-full ">
        <div
          class="h-12 flex text-center py-2"
          v-for="(value, key) in farmingCategory"
          :key="key"
        >
          <div class="flex-1 self-center">{{ value }}</div>
          <div class="flex-1 self-center">
            {{ categoryOutputValueInfo[0][key] || '0' }}
          </div>
          <div class="flex-1 self-center">
            {{ categoryOutputValueInfo[1][key] || '0' }}
          </div>
          <div class="flex-1 flex self-center justify-evenly">
            <img
              :src="`../../assets/img/${
                categoryOutputValueInfo[1][key] -
                  categoryOutputValueInfo[0][key] >
                0
                  ? 'up'
                  : categoryOutputValueInfo[1][key] -
                      categoryOutputValueInfo[0][key] ==
                    0
                  ? 'notChange'
                  : 'down'
              }.svg`"
              alt=""
              width="25"
              height="25"
            />
            <p class="self-center">3.5%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
