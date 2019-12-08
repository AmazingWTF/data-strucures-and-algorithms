<template>
  <div>
    <div ref="wrapper" class="wrapper">

      <CanvasLineToNode
        :radius="40"
        ref="can"
        v-bind:width="wrapperSize[0]"
        v-bind:height="wrapperSize[1]"
      />
      <div v-for="(node, index) in maps.list" :key="index" :class="node.type" :style="node.style || {}">
        {{node.val}}
      </div>

    </div>
  </div>
</template>

<script>
import CanvasLineToNode from '@/components/CanvasLineToNode.vue'
const calcCoords = (arr, x = 0, y = 0) => {
  const [px, py] = arr
  arr.splice(0, 2, px + x, py + y)
  return arr
}

export default {
  name: 'LinkedListMap',
  components: {
    CanvasLineToNode
  },
  props: {
    childKey: {
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
      wrapperSize: [0, 0],
      current: [0, 0],
      maps: {
        list: []
      },

      cacheMap: new Map()
    }
  },
  watch: {
    current (newVal, oldVal) {
      if (newVal) {
        const height = 300
        const width = 1200
        const [x, y] = newVal.map(e => e * 40)
        this.wrapperSize.splice(0, 2, x > width ? x : width, y > height ? y : height)
      }
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
      this.showByGrap(head)

      // this.$nextTick(() => {
      //   const {height, width} = this.getWrapperSize(this.$refs[`wrapper${id}`][0])
      //   this.canvasSize.push({
      //     height,
      //     width
      //   })
      // })
    },

    // 开始展示链表
    showByGrap (head, index = 0) {
      while (head) {
        let child = head[this.childKey]
        this.showNext(head, index)
        // 处理child
        if (child) {
          calcCoords(this.current, -1)
          this.showArrow()
          this.showByGrap(child)
          calcCoords(this.current, 0, -1)
          calcCoords(this.current, 2)
        } else {
        }
        head = head.next
      }
    },

    // 处理 next
    showNext (head, index) {
      calcCoords(this.current, 1)
      let [x, y] = this.current.map(e => e * 40)

      this.maps.list.push({
        type: 'node',
        val: head.val,
        style: {
          left: x + 'px',
          top: y + 'px'
        }
      })
      this.drawRandom(index, head, [x, y])
      this.showArrow(true)
    },

    // 连接线添加
    showArrow (isNext) {
      let node = {}
      if (isNext) {
        node.type = 'next'
        calcCoords(this.current, 1)
      } else {
        node.type = 'shifter'
        calcCoords(this.current, 0, 1)
      }
      this.maps.list.push(node)
      this.calcPoint(node)
    },

    // 计算当前坐标
    calcPoint (node) {
      let [x, y] = this.current.map(e => e * 40 + 'px')
      node.style = {
        left: x,
        top: y
      }
      this.maps.list.push(node)
    },

    // 缓存
    drawRandom (index, head, point) {
      let _this = this
      if (!head) return
      while (head) {
        if (!this.cacheMap.has(head)) {
          this.cacheMap.set(head, point)
        } else {
          let endPoint = this.cacheMap.get(head)
          setTimeout(() => {
            _this.$refs.can.drawBezeierLine(point, endPoint)
            console.log(point, endPoint)
          }, 0)
        }
        if (head.random) {
          this.drawRandom(head.random)
        }
        head = head.next
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
