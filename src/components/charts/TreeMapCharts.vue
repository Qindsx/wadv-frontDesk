<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TreemapChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref } from 'vue';
import { SownAreaofFarmCropsData } from '../charts/data/SownAreaofFarmCrops';

use([CanvasRenderer, TreemapChart, TitleComponent, TooltipComponent]);

const getLevelOption = () => {
  return [
    {
      itemStyle: {
        borderWidth: 0,
        gapWidth: 5,
      },
    },
    {
      itemStyle: {
        gapWidth: 1,
      },
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        gapWidth: 1,
        borderColorSaturation: 0.6,
      },
    },
  ];
};

const formatUtil = echarts.format;

console.log(SownAreaofFarmCropsData);
const option = ref({
  title: {
    text: '农作物播种面积',
    left: 'center',
  },
  tooltip: {
    formatter: function (info) {
      let value = info.value;
      let treePathInfo = info.treePathInfo;
      let treePath: any[] = [];
      for (var i = 1; i < treePathInfo.length; i++) {
        treePath.push(treePathInfo[i].name);
      }
      return [
        '<div class="tooltip-title">' +
          formatUtil.encodeHTML(treePath.join('/')) +
          '</div>',
        '播种面积 ' + formatUtil.addCommas(value) + ' 千公顷',
        // '占所有耕地面积比例' + formatUtil
      ].join('');
    },
  },
  series: [
    {
      name: ' ',
      type: 'treemap',
      visibleMin: 300,
      abel: {
        show: true,
        formatter: '{b}',
      },
      itemStyle: {
        borderColor: '#fff',
      },
      levels: getLevelOption(),
      data: SownAreaofFarmCropsData[0].data,
    },
  ],
});
</script>

<template>
  <div><v-chart class="chart" :option="option" /></div>
</template>
<style scoped>
.chart {
  height: 400px;
}
</style>
