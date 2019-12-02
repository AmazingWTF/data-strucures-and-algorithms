<template>
  <div id="app">
    <ul class="tab-bar">
      <router-link v-for="r in $router.options.routes" :key="r.name" :to="r.path" tag="li">
        {{r.path}}
      </router-link>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.tab-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  li {
    background: #e1e1e1;
    line-height: 50px;
    text-decoration: underline;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
