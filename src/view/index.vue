<script setup lang="ts">
import ScreenAdapter from '../components/ScreenAdapter.vue';
import { RuralSocialInfrastructure } from '../components/charts'
</script>

<template>
  <ScreenAdapter>
    <header id="header">
      <h3 class="header-title">大屏数据可视化模板</h3>
    </header>

    <div id="container">
      <div id="flexCon">
        <div class="flex-row">
          <div class="flex-cell flex-cell-l">
            <div class="chart-wrapper">
              <h3 class="chart-title">图表</h3>
              <div class="chart-div">
                <div class="chart-loader">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-cell flex-cell-c">
            <div class="chart-wrapper">
              <h3 class="chart-title">test</h3>
              <div class="chart-div">
                <RuralSocialInfrastructure></RuralSocialInfrastructure>
              </div>
            </div>
          </div>
          <div class="flex-cell flex-cell-r">
            <div class="chart-wrapper">
              <h3 class="chart-title">test434</h3>
              <div class="chart-div chart-done">
                <div class="chart-loader">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-cell-lc">
            <div class="chart-wrapper">
              <h3 class="chart-title"></h3>
              <div class="chart-div chart-done">
                <div class="chart-loader">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-cell flex-cell-r">
            <div class="chart-wrapper">
              <h3 class="chart-title"></h3>
              <div class="chart-div chart-done">
                <div class="chart-loader">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ScreenAdapter>
</template>
<style scoped>
@import url('../assets/css/app.css');
.screen-flex {
  background: #09152a;
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
