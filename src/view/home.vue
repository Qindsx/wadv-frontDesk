<script setup lang="ts">
import {
  EmploymentTrendsChart,
  RuralSocialInfrastructure,
  GrossAgriculturalOutputChart,
  CenterMapChart,
  TreeMapCharts,
  OutputExponentChart,
  OutputCompositionChart,
  OutputCompositionPieChart,
} from '../components/charts';
import { RuralGrassrootsUtils, CenterView } from '../components/home';
import { grassrootsInfoByYears, productionValueInfoByYears } from '../api/home';
import { onMounted, Ref, ref } from 'vue';
import CountUp from 'vue-countup-v3';
import { useRouter } from 'vue-router';

import { GrossIndicesgross3Datum } from '../types/RuralandAgriculturalBasicInformation';

const router = useRouter();

// interface EmploymentTrendsDataType {
//   agriculturalLaborers: number[];
//   agricultureEmployees: number[];
//   noAgriculturalLaborers: number[];
//   noAgricultureEmployees: number[];
// }

const EmploymentTrendsYears: Ref<string[]> = ref([]);
const agriculturalLaborers: Ref<Number[]> = ref([]);
const agricultureEmployees: Ref<Number[]> = ref([]);
const noAgriculturalLaborers: Ref<Number[]> = ref([]);
const noAgricultureEmployees: Ref<Number[]> = ref([]);

const RuralSocialInfrastructureYears: Ref<String[]> = ref([]);
const villagesBroad: Ref<Number[]> = ref([]);
const villagesPropBroad: Ref<Number[]> = ref([]);
const villagesPropTv: Ref<Number[]> = ref([]);
const villagesPropWater: Ref<Number[]> = ref([]);
const villagesTv: Ref<Number[]> = ref([]);
const villagesWater: Ref<Number[]> = ref([]);

const townshipGov: Ref<number> = ref(0);
const subdistrictOff: Ref<Number> = ref(0);
const villagersCom: Ref<Number> = ref(0);
const villagersSub: Ref<Number> = ref(0);

const townGov: Ref<Number> = ref(0);
const agriculturalNumber: Ref<number> = ref(0);
const infrastructureCoverage: Ref<number> = ref(0);
const annualGrossAgriculturalOutputValue = ref('');
const annualGrowthRateOfOutputValue = ref('');

const productionValueInfo: Ref<GrossIndicesgross3Datum[]> = ref([]);

onMounted(async () => {
  const res = await Promise.all([
    grassrootsInfoByYears({ year: ['2016', '2017', '2018', '2019', '2020'] }),
    productionValueInfoByYears({
      year: [
        '1951',
        '1952',
        '1953',
        '1954',
        '1955',
        '1956',
        '1957',
        '1958',
        '1959',
        '1960',
        '1961',
        '1962',
        '1963',
        '1964',
        '1965',
        '1966',
        '1967',
        '1968',
        '1969',
        '1970',
        '1971',
        '1972',
        '1973',
        '1974',
        '1975',
        '1976',
        '1977',
        '1978',
        '1979',
        '1980',
        '1981',
        '1982',
        '1983',
        '1984',
        '1985',
        '1986',
        '1987',
        '1988',
        '1989',
        '1990',
        '1991',
        '1992',
        '1993',
        '1994',
        '1995',
        '1996',
        '1997',
        '1998',
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
      ],
    }),
  ]);
  console.log(res[1].data);
  // const res = await grassrootsInfoByYears({ year: [] });
  if (res) {
    // console.log(res.data);

    // 处理 grassrootsInfoByYears 数据
    res[0].data.forEach((item) => {
      //当年数据不为空
      if (item.agriculturalLaborers !== -1) {
        EmploymentTrendsYears.value.push(item.year);
        agriculturalLaborers.value.push(item.agriculturalLaborers);
        agricultureEmployees.value.push(item.agricultureEmployees);
        noAgriculturalLaborers.value.push(item.noAgriculturalLaborers);
        noAgricultureEmployees.value.push(item.noAgricultureEmployees);
      }

      //当年数据不为空
      if (item.villagesBroad !== -1) {
        RuralSocialInfrastructureYears.value.push(item.year);
        villagesBroad.value.push(item.villagesBroad);
        villagesPropBroad.value.push(item.villagesPropBroad);
        villagesPropTv.value.push(item.villagesPropTv);
        villagesPropWater.value.push(item.villagesPropWater);
        villagesWater.value.push(item.villagesWater);
        villagesTv.value.push(item.villagesTv);
      }
    });

    productionValueInfo.value = res[1].data;
    annualGrossAgriculturalOutputValue.value = (
      productionValueInfo.value[productionValueInfo.value.length - 1]
        ?.grossOutputValue / 10000
    ).toFixed(2);
    // 较上年增长率
    annualGrowthRateOfOutputValue.value = (
      ((~~productionValueInfo.value[productionValueInfo.value.length - 1]
        .grossOutputValue -
        ~~productionValueInfo.value[productionValueInfo.value.length - 2]
          .grossOutputValue) /
        ~~productionValueInfo.value[productionValueInfo.value.length - 2]
          .grossOutputValue) *
      100
    ).toFixed(2);
    console.log(
      Number(productionValueInfo.value[productionValueInfo.value.length - 1])
    );
    // 获取农村基层组织数量(最新一年)
    let lastYeat = res[0].data.length - 1;
    console.log(res[0].data[lastYeat]);
    townshipGov.value = res[0].data[lastYeat].townshipGov;
    subdistrictOff.value = res[0].data[lastYeat].subdistrictOff;
    villagersCom.value = res[0].data[lastYeat].villagersCom;
    villagersSub.value = res[0].data[lastYeat].villagersSub;

    townGov.value = res[0].data[lastYeat].townGov;
    agriculturalNumber.value =
      res[0].data[lastYeat].agricultureEmployees +
      res[0].data[lastYeat].agriculturalLaborers;
    infrastructureCoverage.value = Math.floor(
      (res[0].data[lastYeat].villagesPropBroad +
        res[0].data[lastYeat].villagesPropTv +
        res[0].data[lastYeat].villagesPropWater) /
        3
    );
    console.log(res[0].data[lastYeat]);
  }
});

// 页面跳转
</script>

<template>
  <div class="">
    <div
      class="text-lg z-10 text-center absolute flex top-6"
      style="left: 14.44444%"
    >
      <div
        class="button-bg w-32"
        @click="() => router.push('/investmentOutput')"
      >
        投入与产量
      </div>
      <div
        class="button-bg w-32"
        @click="() => router.push('/agriculturalProduction')"
      >
        农产品产量
      </div>
      <div class="button-bg-active w-32" @click="() => router.push('/home')">
        首页
      </div>
    </div>
    <header id="header" class="">
      <h3 class="header-title">大屏数据可视化模板</h3>
    </header>

    <div id="container" class="grid grid-cols-4 grid-rows-6 gap-2 px-1">
      <div
        class="chart-div col-start-1 col-span-1 row-start-1 row-span-2 flex flex-col"
      >
        <p class="chart-title">农村基层组织数量</p>

        <div class="flex-1">
          <RuralGrassrootsUtils
            :townGov="townGov"
            :subdistrictOff="subdistrictOff"
            :villagersCom="villagersCom"
            :villagersSub="villagersSub"
          ></RuralGrassrootsUtils>
        </div>
      </div>
      <div
        class="chart-div col-start-1 col-span-1 row-start-3 row-span-2 flex flex-col"
      >
        <p class="chart-title">农业从业人数变化趋势</p>
        <div class="flex-1">
          <EmploymentTrendsChart
            :years="EmploymentTrendsYears"
            :agriculturalLaborers="agriculturalLaborers"
            :agricultureEmployees="agricultureEmployees"
            :noAgriculturalLaborers="noAgriculturalLaborers"
            :noAgricultureEmployees="noAgricultureEmployees"
          ></EmploymentTrendsChart>
        </div>
      </div>
      <div
        class="chart-div col-start-1 col-span-1 row-start-5 row-span-2 flex flex-col"
      >
        <p class="chart-title">农业基础设施数量</p>
        <div class="flex-1">
          <RuralSocialInfrastructure
            :years="RuralSocialInfrastructureYears"
            :villagesBroad="villagesBroad"
            :villagesPropBroad="villagesPropBroad"
            :villagesPropTv="villagesPropTv"
            :villagesPropWater="villagesPropWater"
            :villagesTv="villagesTv"
            :villagesWater="villagesWater"
          ></RuralSocialInfrastructure>
        </div>
      </div>
      <div
        class="chart-div col-start-2 col-span-2 row-start-1 row-span-1 flex justify-between"
      >
        <div class="flex">
          <p class="text-xl self-center">乡政府数量：</p>
          <p class="text-8xl self-end text-indigo-700">
            <count-up :end-val="townshipGov"></count-up>
          </p>
          <p class="text-lg self-end">个</p>
        </div>
        <div class="dividing-line"></div>
        <div class="flex">
          <p class="text-xl self-center">农业从业人数：</p>
          <p class="text-8xl self-end text-indigo-700">
            <count-up
              :decimalPlaces="1"
              :end-val="agriculturalNumber"
            ></count-up>
          </p>
          <p class="text-lg self-end">万人</p>
        </div>
        <div class="dividing-line"></div>
        <div class="flex">
          <p class="text-xl self-center">基础设施覆盖率：</p>
          <p class="text-8xl self-end text-indigo-700">
            <count-up :end-val="infrastructureCoverage"></count-up>
          </p>
          <p class="text-lg self-end">%</p>
        </div>
      </div>
      <div class="col-start-2 col-span-2 row-start-2 row-span-4">
        <CenterView></CenterView>
      </div>
      <div
        class="chart-div col-start-2 col-span-2 row-start-6 row-span-1 flex justify-evenly"
      >
        <div class="flex">
          <p class="text-xl self-center">
            {{
              EmploymentTrendsYears[EmploymentTrendsYears.length - 1]
            }}年农业总产值：
          </p>
          <p class="text-8xl self-end text-indigo-700">
            <count-up
              :decimalPlaces="1"
              :end-val="annualGrossAgriculturalOutputValue"
            ></count-up>
          </p>
          <p class="text-lg self-end">亿元</p>
        </div>
        <div class="dividing-line"></div>
        <div class="flex">
          <p class="text-xl self-center">农业总产值年增长率：</p>
          <p class="text-8xl self-end text-indigo-700">
            <count-up
              :decimalPlaces="1"
              :end-val="annualGrowthRateOfOutputValue"
            ></count-up>
          </p>
          <p class="text-lg self-end">%</p>
        </div>
      </div>
      <div
        class="chart-div col-start-4 col-span-1 row-start-1 row-span-2 flex flex-col"
      >
        <p class="chart-title">农业产值指数变化趋势</p>
        <div class="flex-1">
          <OutputExponentChart
            :productionValueInfo="productionValueInfo"
          ></OutputExponentChart>
        </div>
      </div>
      <div
        class="chart-div col-start-4 col-span-1 row-start-3 row-span-2 flex flex-col"
      >
        <p class="chart-title">农业各分类产值变化趋势</p>
        <div class="flex-1">
          <OutputCompositionChart></OutputCompositionChart>
        </div>
      </div>
      <div
        class="chart-div col-start-4 col-span-1 row-start-5 row-span-2 flex flex-col"
      >
        <p class="chart-title">历年农业总产值变化趋势</p>
        <div class="flex-1">
          <GrossAgriculturalOutputChart
            :productionValueInfo="productionValueInfo"
          ></GrossAgriculturalOutputChart>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('../assets/css/app.css');

.dividing-line {
  width: 1px;
  height: 85%;
  background-color: #f3f4f6;
}

.button-bg-active {
  cursor: pointer;
  background-image: url('../assets/img/page_button_active.png');
  background-repeat: no-repeat;
  background-position: 0%;
}

.button-bg {
  cursor: pointer;
  background-image: url('../assets/img/page_button.png');
  background-repeat: no-repeat;
  background-position: 0%;
}
</style>
