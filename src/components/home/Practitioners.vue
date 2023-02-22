<!--  农业从业人员数量 -->
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
import { onDeactivated, onMounted, ref, provide } from 'vue';

use([
  GridComponent,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const option1 = ref({
  title: {
    show: false,
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },

  backgroundColor: "rgba(0,0,0,0)",
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'center',
    textStyle:{
      color: "#fff"
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 42.96, name: '农林牧渔(万人)' },
        { value: 93.18, name: '非农从业人员(万人)' },
      ],

      label: {
        show: false,
        // position: 'center'
      },
      labelLine: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
const option2 = ref({
  title: {
    show: false,
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },

  backgroundColor: "rgba(0,0,0,0)",
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'center',
    textStyle: {
      color: "#fff"
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 2.61, name: '农业从业人员' },
        { value: 3.5, name: '非农业从业人员' },
      ],

      label: {
        show: false,
        // position: 'center'
      },
      labelLine: {
        show: false,
      },
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
    // 让图表占满容器
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
});

const practitionersFRef1 = ref();
const practitionersFRef2 = ref();
const practitionersRef1 = ref();
const practitionersRef2 = ref();
const ro = new ResizeObserver((entries) => {
  practitionersRef1.value.resize();
  practitionersRef2.value.resize();
});
onMounted(() => {
  ro.observe(practitionersFRef1.value);
  ro.observe(practitionersFRef2.value);
});
onDeactivated(() => {
  ro.unobserve(practitionersFRef1.value);
  ro.unobserve(practitionersFRef2.value);
});
</script>

<template>
  <div class="flex pt-3">
    <div class="h-full w-full" ref="practitionersFRef1">
      <v-chart class="chart" :option="option1" ref="practitionersRef1" />
    </div>
    <div class="h-full w-full" ref="practitionersFRef2">
      <v-chart class="chart" :option="option2" ref="practitionersRef2" />
    </div>
  </div>
</template>
<style scoped></style>
