<template>
  <div class="hello">
    <linked-list-map ref="copyRandomKeyList" title="复制random键链表" />
  </div>
</template>

<script>
import copyRandomKeyListData from './copyRandomKeyListData.json'
import LinkedListMap from '@/components/LinkedListMap'

export default {
  name: 'CopyRandomKeyList',
  meta: '复制random键链表',
  components: {
    LinkedListMap
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$refs.copyRandomKeyList.showMap(copyRandomKeyListData)
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
