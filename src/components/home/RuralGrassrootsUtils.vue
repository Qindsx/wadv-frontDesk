<!--  政府组织数量 -->

<script setup lang="ts">
const props = defineProps<{
  townGov: Number;
  subdistrictOff: Number;
  villagersCom: Number;
  villagersSub: Number;
}>();
</script>

<template>
  <div class="grid grid-cols-2 gap-2 h-full">
    <!-- <div class=" text-center col-span-1">
        <p class=" text-white text-bs">乡政府(个)</p>
        <p class=" text-blue-700 text-3xl p-2">3</p>
      </div> -->
    <div
      class="text-center col-span-1 shadow-box rounded-2xl rounded-br-none p-2 flex justify-around"
    >
      <div class="rounded-full w-16 h-16 self-center bg-1">
        <div class="w-full h-full bg-img-1"></div>
      </div>
      <div>
        <p class="text-white text-lg font-semibold pt-4">镇政府(个)</p>
        <p class="text-blue-700 text-3xl p-2">{{ props.townGov }}</p>
      </div>
    </div>
    <div
      class="text-center col-span-1 shadow-box rounded-2xl rounded-bl-none p-4 flex justify-around"
    >
      <div class="rounded-full w-16 h-16 self-center bg-2">
        <div class="w-full h-full bg-img-2"></div>
      </div>
      <div>
        <p class="text-white text-lg font-semibold pt-4">办事处(个)</p>
        <p class="text-blue-700 text-3xl p-2">{{ props.subdistrictOff }}</p>
      </div>
    </div>
    <div
      class="text-center col-span-1 shadow-box rounded-2xl rounded-tr-none p-4 flex justify-around"
    >
      <div class="rounded-full w-16 h-16 self-center bg-3">
        <div class="w-full h-full bg-img-3"></div>
      </div>
      <div>
        <p class="text-white text-lg font-semibold pt-4">村委会(个)</p>
        <p class="text-blue-700 text-3xl p-2">{{ props.villagersCom }}</p>
      </div>
    </div>
    <div
      class="text-center col-span-1 shadow-box rounded-2xl rounded-tl-none p-4 flex justify-around"
    >
      <div class="rounded-full w-16 h-16 self-center bg-4">
        <div class="w-full h-full bg-img-4"></div>
      </div>
      <div>
        <p class="text-white text-lg font-semibold pt-4">村民小组(个)</p>
        <p class="text-blue-700 text-3xl p-2">{{ props.villagersSub }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.shadow-box {
  box-shadow: inset 0 0 0.8rem 0.8rem rgba(0, 6, 255, 0.31);
  background-color: rgb(3, 10, 80);
}
.bg-1 {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}
.bg-img-1 {
  background-image: url('../../assets/img/townGov.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
}.bg-2 {
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
}

.bg-img-2 {
  background-image: url('../../assets/img/subdistrictOff.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
}.bg-3 {
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
}

.bg-img-3 {
  background-image: url('../../assets/img/villagersCom.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
}.bg-4 {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-img-4 {
  background-image: url('../../assets/img/villagersSub.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
}
</style>
