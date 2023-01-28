<script setup lang="ts">
import ScreenAdapter from '../components/ScreenAdapter.vue';
</script>

<template>
  <ScreenAdapter>
    <!-- 艾师傅交换空间 -->
    <RouterView></RouterView>
  </ScreenAdapter>
</template>
<style scoped>
.screen-flex {
  background: #09152a;
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
