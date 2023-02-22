<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { debounce } from 'lodash';

interface Props {
  width?: string;
  height?: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: '1920',
  height: '1080',
});
const style = reactive({
  width: props.width + 'px',
  height: props.height + 'px',
  transform: 'scale(1) translate(-50%, -50%)',
});
//获取缩放比例
const getScale = () => {
  const w = window.innerHeight / ~~props.height;
  const h = window.innerWidth / ~~props.width;
  return w < h ? w : h;
};
// 设置比例
const setScale = () => {
  style.transform =
    'translateZ(0) scale(' + getScale() + ') translate(-50%, -50%)';
};

onMounted(() => {
  setScale();
  window.onresize = debounce(setScale, 500)
})
</script>

<template>
  <div class="body screen-flex relative" :style="style">

    <slot></slot>
  </div>
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
