<script setup lang="ts">
import { ref, defineProps, watch, Ref } from 'vue';
import { AnimalHusbandryProductionType } from '../../types/AgriculturalProductionController';

const props = defineProps<{
  years: string[];
  data: AnimalHusbandryProductionType[];
}>();

const AnimalHusbandryData2019: Ref<AnimalHusbandryProductionType | any> = ref(
  {}
);

const AnimalHusbandryData2020: Ref<AnimalHusbandryProductionType | any> = ref(
  {}
);

const AnimalHusbandryCategory = ref({
  yearendStockAnimals: '年末大牲畜存栏(头)',
  cowsBreed: '良种及改良种乳牛(头)',
  beefCattle: '肉用牛(头)',
  horses: '马(头)',
  donkeys: '驴(头)',
  mutes: '骡(头)',
  yearendSheep: '年末羊只数(只)',
  yearendHogs: '年末牲猪存栏(万头)',
  femalHogs: '能繁母猪(万头)',
  slaughteredFattenedHogs: '全年肉猪出栏(万头)',
  slaughteredCattle: '全年出售和自宰肉用牛(头)',
  slaughteredSheep: '全年出售和自宰肉用羊(只)',
  slaughteredPoultry: '全年出售和自宰家禽(万只)',
  milk: '牛奶产量(吨)',
  honey: '蜂蜜产量(吨)',
  eggs: '禽蛋产量(吨)',
});

watch(
  () => props,
  () => {
    // props.data.forEach((item) => {});
    AnimalHusbandryData2019.value = props.data[0];
    AnimalHusbandryData2020.value = props.data[1];
  },
  { deep: true }
);

const getGrowthRate = (a: number, b: number): string => {
  if (a || b) {
    if (!a) {
      console.log(a, b);
      return ((b - a) * 100).toFixed(2) + '%';
    } else {
      return (((b - a) / a) * 100).toFixed(2) + '%';
    }
  } else {
    return '无数据';
  }
};
</script>

<template>
  <div class="h-full">
    <p class="text-4xl text-gray-300 font-bold text-center p-3">牧业生产情况</p>
    <div class="flex h-7 text-center text-zinc-400 font-semibold">
      <div class="flex-1">名称</div>
      <div class="flex-1">2019年</div>
      <div class="flex-1">2020年</div>
      <div class="flex-1">增长率</div>
    </div>
    <div class="h-5/6 scrollbar-width_hidden overflow-y-auto">
      <div
        class="h-12 flex text-center py-2 text-base font-normal"
        v-for="(value, key, index) in AnimalHusbandryCategory"
        :key="key"
        :class="Number(index) % 2 == 0 ? ' line-bg-0' : ''"
      >
        <div class="flex-1 self-center">{{ value }}</div>
        <div class="flex-1 self-center">
          {{ AnimalHusbandryData2019[key] || '0' }}
        </div>
        <div class="flex-1 self-center">
          {{ AnimalHusbandryData2020[key] || '0' }}
        </div>
        <div class="flex-1 flex self-center justify-evenly">
          <img
            :src="`/${
              AnimalHusbandryData2020[key] - AnimalHusbandryData2019[key] > 0
                ? 'up'
                : AnimalHusbandryData2020[key] - AnimalHusbandryData2019[key] ==
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
                AnimalHusbandryData2019[key],
                AnimalHusbandryData2020[key]
              )
            }}
          </p>
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
