<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import Login from './pages/login'
import Index from './pages/index'
export default {
  components:{
    Login,
    Index
  }
}
</script>

<style>

</style>
