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

import { productionValueAndCompositionInfoByYears } from '../../api/home';



use([
  GridComponent,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);


provide(THEME_KEY, "dark");

const OutputCompositionPieRef: Ref<echarts.ECharts | null> = ref(null);
const option: Ref<ECBasicOption> = ref({});
onMounted(async () => {
  const res = await productionValueAndCompositionInfoByYears({
    year: ['2019'],
  });
  if (res.data?.length !== 0) {
    option.value = {
      // title: {
      //   text: 'Referer of a Website',
      //   subtext: 'Fake Data',
      //   left: 'center',
      // },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        top: 'top',
      },
      backgroundColor:"rgba(0,0,0,0)",
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: res.data[0].farming, name: '农业' },
            { value: res.data[0].fishery, name: '渔业' },
            { value: res.data[0].forestry, name: '林业' },
            { value: res.data[0].husbandry, name: '牧业' },
            { value: res.data[0].industrialService, name: '农林渔牧服务业' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],

      grid: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    };
    return;
  }
});
window.addEventListener('resize', (e) => {
  OutputCompositionPieRef.value?.resize();
});
</script>

<template>
  <div class="h-full">
    <v-chart ref="OutputCompositionPieRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
