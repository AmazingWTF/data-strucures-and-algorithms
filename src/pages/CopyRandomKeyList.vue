<template>
  <div class="hello">
    <linked-list-map
      :head="head"
      @cb="drawRandom"
      ref="copyRandomKeyList"
      title="复制random键链表"
    />
  </div>
</template>

<script>
import LinkedListMap from '@/components/LinkedListMap'
import { Solution } from '@/scripts/utils'

let n1 = {
  val: 1,
  next: null,
  random: null
}
let n2 = {
  val: 2,
  next: null,
  random: null
}

n1.next = n2
n1.random = n2
n2.random = n2
const copyRandomKeyListData = n1

export default {
  name: 'CopyRandomKeyList',
  meta: '复制random键链表',
  components: {
    LinkedListMap
  },
  data () {
    return {
      head: {}
    }
  },
  created () {
    let solut = new Solution()
    let head = solut.copyRandomList(copyRandomKeyListData)
    this.head = head
  },
  methods: {
    drawRandom ({head, coords}) {
    }
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
