<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
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
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');
// 不同指数
const Classifications = [
  'indicesGrossTotal', // 农林渔牧总产值指数1221313`/``
  'indicesGrossFarming', //农业产值指数
  'indicesGrossForestry', //林业产值指数
  'indicesGrossHusbandry', //牧业产值指数
  'indicesGrossFishery', //渔业产值指数
];
const ClassificationsName = {
  indicesGrossTotal: '农业总产值指数',
  indicesGrossFarming: '农业产值指数',
  indicesGrossForestry: '林业产值指数',
  indicesGrossHusbandry: '牧业产值指数',
  indicesGrossFishery: '渔业产值指数',
};

const _rawData: any[] = [];

const OutputExponentRef = ref<echarts.ECharts | null>();

const datasetWithFilters: echarts.DatasetComponentOption[] = [];
const seriesList: echarts.SeriesOption[] = [];

const option: Ref<ECBasicOption> = ref({});

const props = defineProps<{
  productionValueInfo: GrossIndicesgross3Datum[];
}>();

watch(
  () => props.productionValueInfo,
  () => {
    _rawData.push(['Classification', 'Year', 'Indices Gross']);
    props.productionValueInfo.forEach((item) => {
      // 传递至 GrossAgriculturalOutputChart 组件
      // farmings.value.push(item.grossOutputValue)
      // years.value.push(item.year)
      // provide('farmings', farmings.value)
      // provide('years', years.value)

      _rawData.push(['indicesGrossTotal', item.year, item.indicesGrossTotal]);
      _rawData.push([
        'indicesGrossFarming',
        item.year,
        item.indicesGrossFarming,
      ]);
      _rawData.push([
        'indicesGrossForestry',
        item.year,
        item.indicesGrossForestry,
      ]);
      _rawData.push([
        'indicesGrossHusbandry',
        item.year,
        item.indicesGrossHusbandry,
      ]);
      _rawData.push([
        'indicesGrossFishery',
        item.year,
        item.indicesGrossFishery,
      ]);
    });
    OutputExponentRef.value?.resize();
    echarts.util.each(Classifications, (Classification: string): any => {
      let datasetId = 'dataset_' + Classification;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1951 },
              { dimension: 'Classification', '=': Classification },
            ],
          },
        },
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: ClassificationsName[Classification],
        endLabel: {
          show: true,
          formatter: function (params: any) {
            return (
              ClassificationsName[params.value[0]] + ': ' + params.value[2]
            );
          },
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        emphasis: {
          focus: 'series',
        },
        encode: {
          x: 'Year',
          y: 'Indices Gross',
          label: ['Year', 'Indices Gross'],
          itemName: 'Year',
          tooltip: ['Indices Gross'],
        },
      });
    });
    option.value = {
      animationDuration: 5000,
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData,
        },
        ...datasetWithFilters,
      ],

      backgroundColor: 'rgba(0,0,0,0)',
      legend: {
        show: true,
        selected: {
          农业总产值指数: true,
          农业产值指数: true,
          林业产值指数: false,
          牧业产值指数: false, //牧业产值指数
          渔业产值指数: true, //渔业产值指数
        },
        // formatter: 'Legend {name} asd'
      },
      // title: {
      //   text: 'Income of Germany and France since 1950',
      // },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        nameLocation: 'right',
        boundaryGap: false,
      },
      yAxis: {
        // name: 'Indices Gross',

        // nameLocation:'end',
        scale: true,
      },
      grid: {
        left: 30,
        right: 135,
        bottom: 20,
      },
      series: seriesList,
    };

    // console.log(...datasetWithFilters.value);
    console.log(option.value);
  }
);

// onMounted(() => );

window.addEventListener('resize', () => {
  OutputExponentRef.value?.resize();
});

// const option = ref<ECBasicOption>();
</script>

<template>
  <div class="h-full">
    <v-chart ref="OutputExponentRef" class="chart" :option="option" />
  </div>
</template>
<style scoped></style>
