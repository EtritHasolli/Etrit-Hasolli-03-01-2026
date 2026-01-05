<template>
  <div>
    <Header-part v-if="$route.path !== '/login'"/>
    <router-view />
  </div>
</template>

<script>
  import HeaderPart from './components/HeaderPart.vue';
// import Home from './src/views/Home.vue'

export default {
    name: 'App',
    components: {
      HeaderPart
    }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: white;
  height: 100%;
  overflow: auto;
}

#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
