<script setup lang="ts">
import { onMounted, reactive } from "vue";
import DrawPanel from "./DrawPanel.vue"; // 画布
import ComponentPanel from "./ComponentPanel.vue"; // 左侧组件面板
import PropertyPanel from "./PropertyPanel.vue"; // 右侧属性编辑面板
import TololBar from "./ToolBar.vue"; // 右侧属性编辑面板
import { provide } from 'vue'
const { } = defineProps<{ data: any }>();

const state = reactive({
  
})
const context = reactive({
  current: {
    name:''
  },
  setCurrent: (current: any) => { context.current = current }
})
provide('context', context)
const drawPanelData = reactive({}); // 编辑器数据
const rightPanelType = reactive({}); // 右侧属性面板类型
const rightPanelElementId = reactive({}); // 右侧属性面板编辑的 id

onMounted(() => {



});
</script>

<template>
  <TololBar />
 
  <main >
    <ComponentPanel />
    <DrawPanel />
    <PropertyPanel />
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  height: calc(100vh - 3em)
}
</style>
