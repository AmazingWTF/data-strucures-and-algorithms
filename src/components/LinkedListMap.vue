<template>
  <div>
    <div v-for="map in maps" :key="map.id" class="wrapper">
      <div v-for="(node, index) in map.list" :key="`${map.id}node${index}`" :class="node.type" :style="node.style || {}">
        {{node.val}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkedListMap',
  props: {
    child_key: {
      type: String,
      default: () => 'child'
    },
    title: {
      type: String,
      default: () => '链表 X'
    }
  },
  data () {
    return {
      current: [0, 0],
      maps: []
    }
  },
  created () {
  },
  methods: {
    showMap (head) {
      this.maps.push({
        id: this.maps.length,
        title: this.title,
        list: []
      })
      this.showByGrap(head)
    },

    // 开始展示链表
    showByGrap (head) {
      while (head) {
        let child = head[this.child_key]
        let curX = this.current[0]
        this.showNext(head.val)
        // 处理child
        if (child) {
          this.current[0] -= 1
          this.showArrow()
          this.showByGrap(child)
          this.current[1] -= 1
          this.current[0] = curX + 2
        } else {
        }
        head = head.next
      }
    },

    // 处理 next
    showNext (val = 0) {
      this.current[0] += 1
      let [x, y] = this.current.map(e => e * 40 + 'px')

      this.maps[this.maps.length - 1].list.push({
        type: 'node',
        val,
        style: {
          left: x,
          top: y
        }
      })

      this.showArrow(true)
    },

    // 连接线添加
    showArrow (isNext) {
      let node = {}
      if (isNext) {
        node.type = 'next'
        this.current[0] += 1
      } else {
        node.type = 'shifter'
        this.current[1] += 1
      }
      this.maps[this.maps.length - 1].list.push(node)
      this.calcPoint(node)
    },

    // 计算当前坐标
    calcPoint (node) {
      let [x, y] = this.current.map(e => e * 40 + 'px')
      node.style = {
        left: x,
        top: y
      }
      this.maps[this.maps.length - 1].list.push(node)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: scroll;
  border: 1px solid lightgreen;
}
.wrapper > div {
  position: absolute;
}
.node {
  border: 1px solid #000;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  box-sizing: border-box;
}
.next,
.shifter {
  width: 40px;
  height: 40px;
  position: relative;
}
.shifter::after,
.next::after {
  content: "";
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-left: 6px solid #000;
}
.next {
  background: linear-gradient(#000, #000) 0 center / 100% 2px no-repeat;
}
.shifter {
  background: linear-gradient(#000, #000) 20px center / 50% 2px no-repeat,
    linear-gradient(#000, #000) 19px top / 2px 50% no-repeat;
}
</style>
