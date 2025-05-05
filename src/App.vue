<script setup>
import router from './router';
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <router-view class="child-view"></router-view>
  </div>
  
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
</style>
