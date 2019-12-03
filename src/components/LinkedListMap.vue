<template>
  <div>
    <div :ref="`wrapper${map.id}`" v-for="map in maps" :key="map.id" class="wrapper">

      <CanvasLineToNode v-if="canvasSize[map.id]" ref="can" :width="canvasSize[map.id].width" :height="canvasSize[map.id].height" :radius="40"/>
      <div v-for="(node, index) in map.list" :key="`${map.id}node${index}`" :class="node.type" :style="node.style || {}">
        {{node.val}}
      </div>

    </div>
  </div>
</template>

<script>
import CanvasLineToNode from '@/components/CanvasLineToNode.vue'

export default {
  name: 'LinkedListMap',
  components: {
    CanvasLineToNode
  },
  props: {
    child_key: {
      type: String,
      default: () => 'child'
    },
    title: {
      type: String,
      default: () => '链表 X'
    },
    head: {
      type: Object,
      default: () => ({ val: 0 })
    }
  },
  data () {
    return {
      canvasSize: [],
      current: [0, 0],
      maps: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.showMap(this.head)
    },

    showMap (head) {
      let id = this.maps.length
      this.maps.push({
        id,
        title: this.title,
        list: []
      })
      this.showByGrap(head)

      this.$nextTick(() => {
        const {height, width} = this.getWrapperSize(this.$refs[`wrapper${id}`][0])
        this.canvasSize.push({
          height,
          width
        })
      })
    },

    // 开始展示链表
    showByGrap (head) {
      while (head) {
        let child = head[this.child_key]
        let curX = this.current[0]
        this.showNext(head)
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
    showNext (head) {
      this.current[0] += 1
      let [x, y] = this.current.map(e => e * 40)

      this.maps[this.maps.length - 1].list.push({
        type: 'node',
        val: head.val,
        style: {
          left: x + 'px',
          top: y + 'px'
        }
      })

      this.showArrow(true)
      // TODO: 复制random函数完成即可
      // this.$refs.can.drawBezeierLine()
      this.$emit('cb', {
        head,
        coords: [x, y]
      })
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
    },

    getWrapperSize (wrapper) {
      return {
        height: wrapper.scrollHeight,
        width: wrapper.scrollWidth
      }
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
  border: 1px solid red;
  margin-bottom: 10px;
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
