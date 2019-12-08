<template>
  <canvas :width="width" :height="height" ref="can" />
</template>

<script>
export default {
  name: 'CanvasLineToNode',
  props: {
    radius: {
      type: Number,
      default: () => 50
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      ctx: null
    }
  },
  mounted () {
    this.initPaint()
  },
  methods: {
    initPaint () {
      let can = this.$refs.can
      const ctx = can.getContext('2d')
      this.ctx = ctx
    },
    drawBezeierLine (start, end) {
      let ctx = this.ctx
      const radius = this.radius
      let [startX, startY] = start
      let [endX, endY] = end
      startX += radius / 2
      endX += radius / 2
      if (startX === endX && startY === endY) {
        startX += radius / 4
        endX = startX + radius / 2
      }
      let distance = (startX + endX + radius) / 2
      ctx.beginPath()
      ctx.moveTo(startX + radius, startY)
      ctx.quadraticCurveTo(distance, startY - radius, endX, endY)
      ctx.stroke()
      // 三角箭头
      ctx.beginPath()
      ctx.arc(endX, endY, 3, -Math.PI, Math.PI)
      ctx.fill()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  background-color: lightgreen;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>
