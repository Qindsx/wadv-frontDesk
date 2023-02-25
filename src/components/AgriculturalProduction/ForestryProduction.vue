<script setup lang="ts">
import { forestryProductionByYears } from '../../api/agriculturalProduction';
import { ForestryProductionType } from '../../types/AgriculturalProductionController';
import { onMounted } from 'vue';

onMounted(async () => {
  const res = await forestryProductionByYears({ year: ['2019', '2020'] });
  console.log(res);
});
</script>

<template>
  <div></div>
</template>
<style scoped></style>
