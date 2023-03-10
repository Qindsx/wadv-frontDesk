<script setup lang="ts">
import { forestryProductionByYears } from '../../api/agriculturalProduction';
import { ForestryProductionBarChart } from '../charts';
import { ForestryProductionType } from '../../types/AgriculturalProductionController';
import { onMounted, ref, Ref } from 'vue';

const forestryProduction: Ref<ForestryProductionType[]> = ref([]);

const forestryProductionName = ref({
  seedlingYield: '苗木产量(万株)',
  timber: '木材(万立方米)',
  nanBamboo: '楠竹(万立方米)',
  sundryBamboo: '杂竹(万立方米)',
});

const forestryProduction2019: Ref<ForestryProductionType | any> = ref({});
const forestryProduction2020: Ref<ForestryProductionType | any> = ref({});

onMounted(async () => {
  const res = await forestryProductionByYears({ year: ['2019', '2020'] });
  if (res.data) {
    forestryProduction.value = res.data;
    forestryProduction2019.value = res.data[0];
    forestryProduction2020.value = res.data[1];
  }
});

const getGrowthRate = (a: number, b: number): string => {
  if (a && b) {
    return (((b - a) / a) * 100).toFixed(2) + '%';
  } else {
    return '无数据';
  }
};
</script>

<template>
  <div class="h-full flex">
    <div class="h-full w-1/2">
      <ForestryProductionBarChart
        :data="forestryProduction"
        :years="['2019', '2020']"
      ></ForestryProductionBarChart>
    </div>
    <div class="col-span-2 flex flex-col">
      <p class="text-center text-3xl text-gray-400 font-medium">
        林业生产数量
      </p>
      <div class="flex-1 flex p-2">
        <div class=" w-24 flex justify-evenly flex-col text-center">
          <p class="text-xl text-gray-400">名称</p>
          <p class="text-xl text-gray-400">2019</p>
          <p class="text-xl text-gray-400">2020</p>
          <p class="text-xl text-gray-400">增长率</p>
        </div>
        <div class="flex flex-nowrap overflow-x-auto">
          <div
            class="flex-none flex justify-evenly flex-col w-24 text-center font-normal"
            v-for="(value, key, index) in forestryProductionName"
            :key="key"
            :class="Number(index) % 2 == 0 ? ' line-bg-0' : ''"
          >
            <p class="text-sm">{{ value }}</p>
            <p class="text-lg">{{ forestryProduction2019[key] }}</p>
            <p class="text-lg">{{ forestryProduction2020[key] }}</p>
            <div class="flex self-center justify-evenly text-lg">
              <img
                :src="`/${
                  forestryProduction2019[key] - forestryProduction2020[key] < 0
                    ? 'up'
                    : forestryProduction2019[key] -
                        forestryProduction2020[key] ==
                      0
                    ? 'notChange'
                    : 'down'
                }.svg`"
                alt=""
                width="25"
                height="25"
              />
              <p class="self-center">
                {{
                  getGrowthRate(
                    forestryProduction2019[key],
                    forestryProduction2020[key]
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.line-bg-0 {
  background-color: rgb(19, 41, 76);
}
</style>
