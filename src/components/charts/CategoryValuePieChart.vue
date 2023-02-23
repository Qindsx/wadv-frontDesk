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
import { onMounted, Ref, ref, provide } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

import { CategoryValueType } from '../../types/AgriculturalInputsOutputsController';

use([
  GridComponent,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const option: Ref<ECBasicOption> = ref({});
const EmploymentTrendsRef: Ref<echarts.ECharts | null> = ref(null);

const props = defineProps<{
  categoryValueType?: CategoryValueType[];
  years: string[];
}>();

option.value = {
  legend: {
    top: 'bottom',
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' },
      ],
    },
  ],
};

window.addEventListener('resize', () => {
  EmploymentTrendsRef.value?.resize();
});
</script>

<template>
  <div class="h-full opacity-80">
    <v-chart ref="EmploymentTrendsRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
