<script setup lang="ts">
import { FisheryProductionBarChart } from '../charts';
import { defineProps, Ref, watch, ref } from 'vue';
import { FisheryProductionType } from '../../types/AgriculturalProductionController';

const props = defineProps<{
  years: string[];
  data: FisheryProductionType[];
}>();
const FisheryProductionData: Ref<FisheryProductionType[]> = ref([]);
const years = ref<string[]>([]);

watch(
  () => props,
  () => {
    // 防止数据丢失
    FisheryProductionData.value = props.data;
    years.value = props.years;
  },
  { deep: true }
);
</script>

<template>
  <div class="h-full">
    <FisheryProductionBarChart
      :data="props.data"
      :years="props.years"
    ></FisheryProductionBarChart>
  </div>
</template>
<style scoped></style>
