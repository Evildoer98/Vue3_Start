<script setup lang="ts">

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
// const number: number = 123
// console.log(number);

import {defineComponent, reactive, ref, toRefs} from 'vue'
const year = ref(0)
const user = reactive({name: 'Evildoer', age: 22, sex: '男'})

defineComponent({

  setup() {
      setInterval(() => {
      year.value++ 
      user.age++
    }, 1000)
    return {year, ...toRefs(user)}
  }
})

</script>

<template>
  <!-- vue2中的html 模板中必须要有一对根标签，vue3组件的html模板中没有根标签-->
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <p>第{{year}}年</p>
  <p>姓名{{user.name}}</p>
  <p>年龄{{user.age}}</p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
