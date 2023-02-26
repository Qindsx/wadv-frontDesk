<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TreemapChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  TimelineComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, watch, Ref, onMounted } from 'vue';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { buildTree } from '../charts/data/SownAreaofFarmCrops';
import { TreeSownOutputPerHectareType } from '../../types/AgriculturalProductionController';
import { config } from 'process';

provide(THEME_KEY, 'dark');

use([
  CanvasRenderer,
  LegendComponent,
  TimelineComponent,
  TreemapChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
]);

const props = defineProps<{
  years: string[];
  data: TreeSownOutputPerHectareType[];
  classify: string;
}>();

const TreeMapRef: Ref<echarts.ECharts | null> = ref(null);
const option: Ref<any> = ref({});

const getLevelOption = () => {
  return [
    {
      itemStyle: {
        borderColor: '#777',
        borderWidth: 0,
        gapWidth: 1,
      },
      upperLabel: {
        show: false,
      },
    },
    {
      itemStyle: {
        borderColor: '#555',
        borderWidth: 5,
        gapWidth: 1,
      },
      emphasis: {
        itemStyle: {
          borderColor: '#ddd',
        },
      },
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        borderWidth: 5,
        gapWidth: 1,
        borderColorSaturation: 0.6,
      },
    },
  ];
};

const formatUtil = echarts.format;
// onMounted(() => {
// });

watch(
  () => props,
  () => {
    TreeMapRef.value?.showLoading({
      text: '数据加载中...',
      color: '#c23531',
      textColor: '#ffffc2',
      maskColor: 'rgba(255, 255, 255, 0)',
      zlevel: 0
    });
    props.data.forEach((item) => {
      item.data = buildTree(
        item.data,
        'agriculturalProductName',
        'parentName',
        'notParent'
      );
    });
    TreeMapRef.value?.hideLoading();
    option.value = {
      timeline: {
        title: {
          text: '农作物' + props.classify,
          left: 'center',
        },
        axisType: 'category',
        // realtime: false,
        // loop: false,
        autoPlay: true,
        // currentIndex: 2,
        playInterval: 3000,
        // controlStyle: {
        //     position: 'left'
        // },
        // bottom:'15%',
        data: ['2016年', '2017年', '2018年', '2019年', '2020年'],
      },

      grid: {
        top: 80,
        bottom: '15',
      },

      calculable: true,
      backgroundColor: 'rgba(0,0,0,0)',
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
            props.classify + formatUtil.addCommas(value) + ' 千公顷',
            // '占所有耕地面积比例' + formatUtil
          ].join('');
        },
      },
      options: [
        {
          title: { text: `${props.data[0].year}年农作物${props.classify}` },
          series: [
            {
              name: ' ',
              type: 'treemap',
              animationDuration: '1000',
              animationEasing: 'quinticInOut',
              bottom: '15%',
              // roam :false,
              visibleMin: 300,
              breadcrumb: {
                show: false,
              },
              label: {
                show: true,
                formatter: '{b}',
              },
              itemStyle: {
                borderColor: '#DBEAFE',
              },
              levels: getLevelOption(),
              data: props.data[0].data,
            },
          ],
        },
        {
          title: {
            text: `${props.data[1].year}年农作物${props.classify}`,
          },
          series: [
            {
              name: ' ',
              type: 'treemap',
              visibleMin: 300,
              label: {
                show: true,
                formatter: '{b}',
              },
              itemStyle: {
                borderColor: '#fff',
              },
              levels: getLevelOption(),
              data: props.data[1].data,
            },
          ],
        },
        {
          title: {
            text: `${props.data[2].year}年农作物${props.classify}`,
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
              data: props.data[2].data,
            },
          ],
        },
        {
          title: {
            text: `${props.data[3].year}年农作物${props.classify}`,
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
              data: props.data[3].data,
            },
          ],
        },
        {
          title: {
            text: `${props.data[4].year}年农作物${props.classify}`,
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
              data: props.data[4].data,
            },
          ],
        },
      ],
    };
  },
  { deep: true }
);

// console.log(SownAreaofFarmCropsData);

window.addEventListener('resize', () => {
  TreeMapRef.value?.resize();
});
</script>

<template>
  <div class="h-full w-full">
    <v-chart class="chart" ref="TreeMapRef" :option="option" />
  </div>
</template>
<style scoped></style>
