<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div
    class="text-lg z-10 text-center absolute flex top-6"
    style="left: 14.44444%"
  >
    <div class="button-bg w-32" @click="() => router.push('/investmentOutput')">
      投入与产量
    </div>
    <div
      class="button-bg-active w-32"
      @click="() => router.push('/agriculturalProduction')"
    >
      农产品产量
    </div>
    <div class="button-bg w-32" @click="() => router.push('/home')">首页</div>
  </div>
  <div>
    <header id="header" class="">
      <h3 class="header-title">大屏数据可视化模板</h3>
    </header>
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
