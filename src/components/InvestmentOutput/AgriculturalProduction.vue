<script setup lang="ts">
import { AgriculturalProductionBarchart } from '../charts';
import { agriculturalProductionByYears } from '../../api/investmentOutput';
import { onMounted, ref, Ref, watch, provide } from 'vue';

const years: Ref<string[]> = ref([]);
const aquaticProductsData: Ref<number[]> = ref([]);
const cottonData: Ref<number[]> = ref([]);
const eggsData: Ref<number[]> = ref([]);
const fruitData: Ref<number[]> = ref([]);
const grainsData: Ref<number[]> = ref([]);
const milkData: Ref<number[]> = ref([]);
const oilBearingData: Ref<number[]> = ref([]);
const slaughteredHogsData: Ref<number[]> = ref([]);
const vagetablesData: Ref<number[]> = ref([]);
const slaughteredPoultryData: Ref<number[]> = ref([]);
const YearRetaData = ref<any>({});

onMounted(async () => {
  const res = await agriculturalProductionByYears({
    year: ['2016', '2017', '2018', '2019', '2020'],
  });
  res.data.forEach((item) => {
    years.value.push(item.year);
    aquaticProductsData.value.push(item.aquaticProducts);
    cottonData.value.push(item.cotton);
    eggsData.value.push(item.eggs);
    fruitData.value.push(item.fruit);
    grainsData.value.push(item.grains);
    milkData.value.push(item.milk);
    oilBearingData.value.push(item.oilBearing);
    slaughteredHogsData.value.push(item.slaughteredHogs);
    vagetablesData.value.push(item.vagetables);
    slaughteredPoultryData.value.push(item.slaughteredPoultry);
  });

  YearRetaData.value.grainsData = getYearReta(grainsData.value);
  YearRetaData.value.cottonData = getYearReta(cottonData.value);
  YearRetaData.value.oilBearingData = getYearReta(oilBearingData.value);
  YearRetaData.value.vagetablesData = getYearReta(vagetablesData.value);
  YearRetaData.value.fruitData = getYearReta(fruitData.value);
  YearRetaData.value.slaughteredHogsData = getYearReta(
    slaughteredHogsData.value
  );
  YearRetaData.value.slaughteredPoultryData = getYearReta(
    slaughteredPoultryData.value
  );
  YearRetaData.value.eggsData = getYearReta(eggsData.value);
  YearRetaData.value.milkData = getYearReta(milkData.value);
  YearRetaData.value.aquaticProductsData = getYearReta(
    aquaticProductsData.value
  );
  console.log(YearRetaData.value);
});

const getYearReta = (data: number[]): number => {
  return Number(
    (
      (Math.pow(data[data.length - 1] / data[0], 1 / (data.length - 1)) - 1) *
      100
    ).toFixed(2)
  );
};
</script>

<template>
  <div class="h-full grid grid-cols-4 grid-rows-3 gap-y-6">
    <div class="col-span-1 col-start-1 row-span-1 row-start-1">
      <p class="text-lg text-gray-200 font-semibold text-center">??????(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.grainsData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'??????(???)'"
        :years="years"
        :data="grainsData"
      ></AgriculturalProductionBarchart>
    </div>
    <div class="col-span-2 col-start-2 row-span-1 row-start-1">
      <p class="text-4xl text-gray-300 font-bold text-center p-14">
        ??????????????????????????????
      </p>
    </div>
    <div class="col-span-1 col-start-4 row-span-1 row-start-1">
      <p class="text-lg text-gray-200 font-semibold text-center">??? ???(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.cottonData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'??? ???(???)'"
        :years="years"
        :data="cottonData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-1 row-span-1 row-start-2">
      <p class="text-lg text-gray-200 font-semibold text-center">??? ???(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.oilBearingData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'??? ???(???)'"
        :years="years"
        :data="oilBearingData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-2 row-span-1 row-start-2">
      <p class="text-lg text-gray-200 font-semibold text-center">??? ???(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.vagetablesData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'??? ???(???)'"
        :years="years"
        :data="vagetablesData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-3 row-span-1 row-start-2">
      <p class="text-lg text-gray-200 font-semibold text-center">??? ???(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.fruitData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'??? ???(???)'"
        :years="years"
        :data="fruitData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-4 row-span-1 row-start-2">
      <p class="text-lg text-gray-200 font-semibold text-center">
        ????????????(??????)
      </p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.slaughteredHogsData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'????????????(??????)'"
        :years="years"
        :data="slaughteredHogsData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-1 row-span-1 row-start-3">
      <p class="text-lg text-gray-200 font-semibold text-center">
        ????????????(??????)
      </p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.slaughteredPoultryData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'????????????(??????)'"
        :years="years"
        :data="slaughteredPoultryData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-2 row-span-1 row-start-3">
      <p class="text-lg text-gray-200 font-semibold text-center">
        ????????????(???)
      </p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.eggsData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'????????????(???)'"
        :years="years"
        :data="eggsData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-3 row-span-1 row-start-3">
      <p class="text-lg text-gray-200 font-semibold text-center">??? ???(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.milkData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'??? ???(???)'"
        :years="years"
        :data="milkData"
      >
      </AgriculturalProductionBarchart>
    </div>
    <div class="col-span-1 col-start-4 row-span-1 row-start-3">
      <p class="text-lg text-gray-200 font-semibold text-center">?????????(???)</p>
      <p class="text-sm text-gray-600 text-center">
        ???????????????{{ YearRetaData.aquaticProductsData }}%
      </p>
      <AgriculturalProductionBarchart
        :name="'?????????(???)'"
        :years="years"
        :data="aquaticProductsData"
      >
      </AgriculturalProductionBarchart>
    </div>
  </div>
</template>
<style scoped></style>
