<template>
  <div class="hello">
    <linked-list-map ref="multiLevelList" title="多层链表" />
  </div>
</template>

<script>
import multiLevelListData from './multiLevelListData.json'
import LinkedListMap from '@/components/LinkedListMap'

export default {
  name: 'MultiLevelList',
  components: {
    LinkedListMap
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$refs.multiLevelList.showMap(multiLevelListData)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
