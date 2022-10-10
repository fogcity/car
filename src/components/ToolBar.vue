<script setup lang="ts">
import { onMounted } from "vue";


const {  } = defineProps<{ data?:any }>();

onMounted(() => {
  

});
</script>

<template>
  <section>
    <div class="main">main</div>
    <div class="center">center V</div>
    
    <div class="extra"><div class="preview">Preview</div>extra</div>
  </section>
</template>

<style scoped>
section {
    padding:0 1em;
    display: flex;
    align-items: center;
    background-color: var(--black-color);
    color:white;
    border-left: 1px solid black;
    height:3rem;
    flex:1;
}
.main {
    flex :1;
    text-align: start;
}
.extra {
    flex :1;
    display: flex;
    align-items: center;
    gap:.5em;
    justify-content: flex-end;
}
.preview{
    padding:2px 8px;
    border-radius: 4px;
    background:var(--primary-color)
}
</style>
