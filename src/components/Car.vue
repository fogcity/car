<script setup lang="ts">
import { onMounted } from "vue";
import { BabylonScene } from "../bbl";

const { height, width } = defineProps<{ width: string; height: string }>();

onMounted(() => {
  const canvas = document.querySelector("canvas");
  new BabylonScene(canvas as HTMLCanvasElement);
});
</script>

<template>
  <div>
    <canvas :width="width" :height="height"></canvas>
  </div>
</template>

<style scoped>
div {
  filter: drop-shadow(0 0 0.3em #646cffaa);
}
</style>
