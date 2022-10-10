<script setup lang="ts">
import { css, cx } from '@emotion/css'
import { computed } from "@vue/reactivity";

import { onMounted, reactive, ref, inject } from "vue";
const { } = defineProps();
const context = inject<any>('context')
const state = reactive<any>({
  components: [],
  canIDrag: false,
  canIControl:false,
  scale: 1,
  menuOptions: {
    left: 0, top: 0, show: false
  }
})
const styleObject = computed(() => ({
  transform: `scale(${state.scale})`,
  fontSize: '16px'
}))

function dragOverHandler(ev: any) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}
function dropHandler(ev: any) {
  ev.preventDefault();
  const dropComponent = JSON.parse(ev.dataTransfer.getData("component"));
  const current = { z: state.components.length, id: state.components.length, ...dropComponent.d, padding: 16, width: 100, height: 100, top: ev.offsetY - dropComponent.y, left: ev.offsetX - dropComponent.x }


  if (dropComponent) {
    context.setCurrent(current)
    state.components = [...state.components, current]
  }

}
const wheel = (e: any) => {
  console.log('wheel');

  if (e.wheelDelta > 0) {
    state.scale += 0.05
  }
  else state.scale -= 0.05
}

const genComponentStyle = (component: any) => {
  return css`
  background:white;
        border:${context.current.id == component.id ? '2px solid var(--primary-color)' : '1px solid black'};
        width:${component.width + 'px'};
        height:${component.height + 'px'};
        top:${(context.current.id == component.id?component.top-1:component.top) + 'px'};
        left:${(context.current.id == component.id?component.left-1:component.left) + 'px'};
        position:absolute;
        z-index:${component.z};
        &:hover {
          border: 2px solid var(--primary-color);
        }
      `
}
const genMenuStyle = () => {
  return css`
  padding: 2px 8px;
  position: absolute;
  height: fit-content;
  width:4em;
  background: #3c3c3c;
  border: 2px solid var(--black-color);
        top:${state.menuOptions.top + 'px'};
        left:${state.menuOptions.left + 'px'};
        position:absolute;
        z-index:1000;
      `
}
const componentMouseUpHandler = () => {
  state.canIDrag = false
}
const controlerMouseDownHandler = ()=>{
  state.menuOptions.show=false
  state.canIControl = true
}
const controlerMouseUpHandler = ()=>{
  state.canIControl = false
}
const componentMouseLeaveHandler = () => {
  state.canIDrag = false
}
const controlerMouseLeaveHandler = ()=>{
  state.canIControl = false
}
const componentMouseDownHandler = () => {

  state.canIDrag = true
}
const componentDragHandler = (ev: any) => {
  console.log(124);
  

  if (state.canIDrag) {

    const c = { ...context.current, top: context.current.top + ev.movementY, left: context.current.left + ev.movementX }

    state.components =
      state.components.map((v: any) => v.id != context.current.id ? v : c)
    context.setCurrent(c)
  }
}
const controlerLTdragHandler = (ev: any, position: 'tl' | 'tr' | 'bl' | 'br') => {
  ev.stopPropagation()
  ev.preventDefault()
  if (state.canIControl) {
    let c = context.current
    const offsetY = ev.movementY
    const offsetX = ev.movementX
    switch (position) {
      case 'tl':
        c = { ...context.current, width: c.width - offsetX, height: c.height - offsetY, top: c.top + offsetY, left: c.left + offsetX }
        break;
      case 'tr':
        c = { ...context.current, width: c.width + offsetX, height: c.height - offsetY, top: c.top + offsetY }
        break;
      case 'bl':
        c = { ...context.current, width: c.width - offsetX, height: c.height + offsetY, left: c.left + offsetX }
        break;
      case 'br':
        c = { ...context.current, width: c.width + offsetX, height: c.height + offsetY }
        break;
      default:
        break;
    }
    state.components =
      state.components.map((v: any) => v.id != context.current.id ? v : c)
    context.setCurrent(c)
  }
}
const setMenu = (l: number, t: number) => {
  state.menuOptions = { ...state.menuOptions, left: l, top: t, show: true }
}
const contextMenuHandler = (e: any,component:any) => {
  e.preventDefault()
  context.setCurrent(component)
  setMenu(e.offsetX, e.offsetY)
}
const componentDeleteHandler = (e:any)=>{
  e.preventDefault()
  e.stopPropagation()
  console.log(state.components.filter((v: any) => v.id != context.current.id ));
  state.menuOptions.show=false
  state.components =
      state.components.filter((v: any) => v.id != context.current.id )
      context.setCurrent({})
}
onMounted(() => {


});

</script>

<template>
  <div @click="state.menuOptions.show=false" class="container" @wheel="wheel" >
    <section @click="(e)=>{
      context.setCurrent({})
    }" @drop="dropHandler" @dragover="dragOverHandler" :style='styleObject'>
      <div @contextmenu="(e)=>contextMenuHandler(e,component)" :class="genComponentStyle(component)" @mouseup="componentMouseUpHandler"
      @mouseleave="componentMouseLeaveHandler"
        @mousedown="componentMouseDownHandler" @mousemove="componentDragHandler" @click="(e)=>{
          e.stopPropagation()
          context.setCurrent(component)
        }" v-for="component in state.components">
        <div class="controler">{{component.name}}
          <div @mouseleave="controlerMouseLeaveHandler" @mousedown="controlerMouseDownHandler"
          @mouseup="controlerMouseUpHandler"
          @mousemove="(ev)=>controlerLTdragHandler(ev,'tr')" class="corner tr"
            v-if="context.current.id == component.id"></div>
          <div @mouseleave="controlerMouseLeaveHandler" @mousedown="controlerMouseDownHandler"
          @mouseup="controlerMouseUpHandler" @mousemove="(ev)=>controlerLTdragHandler(ev,'tl')" class="corner tl"
            v-if="context.current.id == component.id" />
          <div 
          @mouseleave="controlerMouseLeaveHandler"
          @mousedown="controlerMouseDownHandler"
          @mouseup="controlerMouseUpHandler"
          @mousemove="(ev)=>controlerLTdragHandler(ev,'bl')" class="corner bl"
            v-if="context.current.id == component.id" />
          <div 
          @mouseleave="controlerMouseLeaveHandler"
          @mousedown="controlerMouseDownHandler"
          @mouseup="controlerMouseUpHandler"
          @mousemove="(ev)=>controlerLTdragHandler(ev,'br')" class="corner br"
            v-if="context.current.id == component.id" />
          <div class="infos" v-if="context.current.id == component.id">
            <div>
              {{component.width}} x {{component.height}}
            </div>
          </div>
        </div>
        <div  v-if="context.current.id == component.id && state.menuOptions.show" :class="genMenuStyle()">
          <div class="menuItem" @click="(e)=>componentDeleteHandler(e)">删除</div>
          <div class="menuItem" >复制</div>
        </div>
      </div>
    </section>
  </div>

</template>

<style scoped>
.menuItem{
  cursor: pointer;
  color:white
}
.container {
  overflow: hidden;
  height: 100%;
  flex: 1;
  background: #F5F5F5;
}

.controler {
  height: 100%;
  position: relative;
}

.corner {
  width: 8px;
  position: absolute;
  height: 8px;
  background: white;
  border: 2px solid var(--primary-color);
}

.infos {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: -3em;
}

.infos div {
  padding: 0px 8px;
  background: white;
  color: white;
  background: var(--primary-color);
  border-radius: 4px;
}

.bl {
  cursor: ne-resize;
  bottom: -6px;
  left: -6px;
}

.br {
  cursor: se-resize;
  bottom: -6px;
  right: -6px;
}

.tl {
  cursor: se-resize;
  top: -6px;
  left: -6px
}

.tr {
  cursor: ne-resize;
  top: -6px;
  right: -6px;
}

section {
  position: relative;
  height: 100%;
}
</style>
