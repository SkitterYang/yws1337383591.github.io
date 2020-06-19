<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Button :to="{path:'/'}">Index</Button>
    <!-- <router-link :to="{path:'/home'}">home</router-link> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    say: function(message) {
      // alert(message);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
