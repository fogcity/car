<script setup lang="ts">
import { inject, onMounted } from "vue";

const context = inject<any>('context')


const { } = defineProps();

onMounted(() => {


});
</script>

<template>
    <div class="panel" >
        <div v-if="context.current.name">
<div>
            组件{{context.current.name}}设置
    </div>
    <div>
        width:{{context.current.width}}
    </div>
    <div>
        height:{{context.current.height}}
    </div>
    <div>
        top:{{context.current.top}}
    </div>
    <div>
        left:{{context.current.left}}
    </div>
        </div>
        <div v-else>
            大屏总体设置
            <div>
                背景图：<input type="file" />
            </div>
        </div>
    </div>
   
</template>

<style scoped>

.panel {
    overflow: hidden;
    transition: width .25s linear;
    display: flex;
    flex-direction: column;
    height: 100%;
    width:240px
}
</style>
