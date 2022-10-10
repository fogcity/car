<script setup lang="ts">
import { onMounted, reactive } from "vue";

type Component = {
    name:string
    type:string
}
const { } = defineProps();
const state = reactive({
    componentList: [{ name: 'Text', type: 'TEXT' },{ name: 'Line', type: 'LINE' }, { name: 'Pie', type: 'PIE' }],

})
function dragStartHandler(ev:any,component:Component) {
  // 添加拖拽数据
  const componentData = JSON.stringify({d:component,y:ev.offsetY,x:ev.offsetX})

  ev.dataTransfer.setData("component", componentData);

}
onMounted(() => {
  

});
</script>

<template>
    <section>
         <div v-for="component in state.componentList">
        <div class='component' draggable="true" @dragstart="(e)=>dragStartHandler(e,component)">{{component.name}}</div>
  </div>
    </section>
 
</template>

<style scoped>
    section {
        transition: width .25s linear;
        height:100%;
        width:270px
    }
    .component {
        width:6em;
        height:6em;
        border: 1px solid #3c3c3c;
        padding:.5em;
        margin:.5em
    }
</style>
