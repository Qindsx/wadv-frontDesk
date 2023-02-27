<script setup lang="ts">
import { ref, defineProps, watch, Ref } from 'vue';
import {
  FruitProductionAreaBarChart,
  FruitProductionBarChart,
  TeaProductionBarChart,
} from '../charts';
import { TeaFruitProductionType } from '../../types/AgriculturalProductionController';

const props = defineProps<{
  years: string[];
  data: TeaFruitProductionType[];
}>();

const FruitProductionAreaData: Ref<any[]> = ref([]);
const FruitProductionData: Ref<any[]> = ref([]);
const TeaProductionData: Ref<any> = ref([]);
const teaPlantationArea = ref<number>(0);
const years = ref<string[]>([]);

watch(
  () => props,
  () => {
    // 防止数据丢失
    props.data.forEach((item) => {
      let {
        fruitOutputAll,
        greenTea,
        otherTea,
        kiwiFruit,
        citrus,
        grapes,
        whiteTea,
        citrusArea,
        kiwiArea,
        peachsArea,
        grapesArea,
        peaches,
        pearsArea,
        pears,
        pickedArea,
        persimmons,
        teaOutputAll,
        teaPlantationArea,
        wulongTea,
        yearendOrchardArea,
      } = item;

      FruitProductionAreaData.value.push({
        citrus,
        kiwiFruit,
        grapes,
        pears,
        peaches,
        persimmons,
      });
      FruitProductionData.value.push({
        citrusArea,
        kiwiArea,
        grapesArea,
        pearsArea,
        peachsArea,
      });
      TeaProductionData.value.push({
        whiteTea,
        greenTea,
        wulongTea,
        otherTea,
      });
    });
    years.value = props.years;
    teaPlantationArea.value = props.data[1].teaPlantationArea
  },
  { deep: true }
);
</script>

<template>
  <div class="h-full grid grid-rows-2 gap-y-2">
    <div class="row-span-1 flex flex-col">
      <p class="text-4xl text-gray-300 font-bold text-center p-3">
        茶叶水果生产情况
      </p>
      <div class="flex-1">
        <TeaProductionBarChart
          :years="years"
          :data="TeaProductionData"
        ></TeaProductionBarChart>
      </div>
      <p class="text-2xl text-gray-400 font-medium text-center pb-3">
        茶叶种植面积 {{ teaPlantationArea }} 亩
      </p>
    </div>
    <div class="row-span-1 flex">
      <div class="h-full w-1/2">
        <FruitProductionAreaBarChart
          :years="years"
          :data="FruitProductionAreaData"
        ></FruitProductionAreaBarChart>
      </div>
      <div class="h-full w-1/2">
        <FruitProductionBarChart
          :years="years"
          :data="FruitProductionData"
        ></FruitProductionBarChart>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
