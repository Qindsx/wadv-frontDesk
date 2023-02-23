<script setup lang="ts">
import { useRouter } from 'vue-router';
import { CategoryOutputValue } from '../components/InvestmentOutput';
const router = useRouter();
</script>

<template>
  <div>
    <div class="text-lg z-10 text-center absolute flex top-6 left-2/3">
      <div class="button-bg w-32" @click="() => router.push('/home')">首页</div>
      <div
        class="button-bg-active w-32"
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
    </div>
    <header id="header" class="">
      <h3 class="header-title">大屏数据可视化模板</h3>
    </header>
    <div id="container" class="grid grid-cols-10 grid-rows-3 gap-2 px-1">
      <div
        class="chart-div col-start-1 col-span-6 row-start-1 row-span-2 flex flex-col"
      >
        <CategoryOutputValue></CategoryOutputValue>
      </div>
      <div
        class="chart-div col-start-7 col-span-4 row-start-1 row-span-2 flex flex-col"
      ></div>
      <div
        class="chart-div col-start-1 col-span-5 row-start-3 row-span-1 flex flex-col"
      ></div>
      <div
        class="chart-div col-start-6 col-span-5 row-start-3 row-span-1 flex flex-col"
      ></div>
    </div>
  </div>
</template>
<style scoped>
@import url('../assets/css/app.css');

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
