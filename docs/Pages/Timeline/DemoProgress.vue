<template lang="pug">
  .demo-progress
    Info(:responseTime="responseTime" :over="over" :timeout="timeout" :expire="expire")
    .progress
      .fill(:style="progressFillStyle")
      .event.first start
      .event(v-for="(event, index) in eventsToShow" :class="index|cls" :style="event|style") {{event.name}}
</template>

<script>
import promiseOver from 'promise-over'
import Info from './Info'

export default {
  name: 'DemoProgress',
  components: {
    Info
  },
  data () {
    const now = new Date()
    return {
      updateDelay: 100,
      minTime: 3000,
      startTime: now,
      currentTime: now,
      events: [],
      frameInterval: null
    }
  },
  props: [
    'data'
  ],
  computed: {
    responseTime () {
      return this.data[0] * 1000
    },
    over () {
      return this.data[1] * 1000
    },
    timeout () {
      return this.data[2] * 1000
    },
    expire () {
      return this.data[3] * 1000
    },
    maxTimeDiff () {
      return Math.max(...this.events.map(event => event.time - this.startTime))
    },
    denominator () {
      return Math.max(this.minTime, this.maxTimeDiff, this.currentTimeDiff)
    },
    currentTimeDiff () {
      return this.currentTime - this.startTime
    },
    completeTime () {
      const completeEvent = this.events.find(event => ['expire', 'done'].includes(event.name))
      if (!completeEvent) {
        return null
      }
      return completeEvent.time
    },
    completeTimeDiff () {
      if (!this.completeTime) {
        return null
      }
      return this.completeTime - this.startTime
    },
    progressFillStyle () {
      const molecular = this.completeTimeDiff || this.currentTimeDiff

      if (molecular >= this.denominator) {
        return {
          width: '100%'
        }
      }

      const percent = molecular / this.denominator * 100

      return {
        width: `${percent}%`
      }
    },
    eventsToShow () {
      return this.events.map(event => ({
        name: event.name,
        value: (event.time - this.startTime) / this.denominator
      }))
    }
  },
  methods: {
    exec () {
      return new Promise(resolve => {
        setTimeout(() => {
          this.pushEvent('response')
          resolve()
        }, this.responseTime)
      })
    },
    pushEvent (name) {
      this.events = this.events.concat([{
        name,
        time: new Date()
      }])
    },
    start () {
      this.setFrameInterval()
      promiseOver(
        this.exec(),
        this.over,
        () => this.pushEvent('timeout'),
        this.timeout,
        this.expire
      ).then(() => this.pushEvent('done'))
        .catch(() => this.pushEvent('expire'))
        .finally(this.clearFrameInterval)
    },
    execNextFrame () {
      this.currentTime = new Date()
    },
    setFrameInterval () {
      this.clearFrameInterval()
      this.frameInterval = setInterval(this.execNextFrame, this.updateDelay)
    },
    clearFrameInterval () {
      if (this.frameInterval) {
        clearInterval(this.frameInterval)
        this.frameInterval = null
      }
    }
  },
  filters: {
    style (event) {
      return {
        right: `${100 - event.value * 100}%`
      }
    },
    cls (index) {
      return {
        down: index % 2 === 0
      }
    }
  },
  mounted () {
    this.start()
  },
  beforeDestroy () {
    this.clearFrameInterval()
  }
}
</script>

<style lang="sass" scoped>
.demo-progress
  display: flex
  align-items: center
  margin-top: 4px
  margin-bottom: 16px

.progress,
.fill
  flex: 1
  position: relative
  height: 8px
  border-radius: 4px

.progress,
  margin-left: 8px
  background: var(--item-color)

.fill
  position: absolute
  background: var(--color)
  transition: width 0.1s linear
  top: 0

.event
  position: absolute
  padding: 2px 4px
  border-radius: 4px
  top: 12px
  background: var(--item-color)
  color: var(--color)
  transition: right 0.3s linear

  &.first:before,
  &:not(.first):after
    content: ''
    width: 4px
    border-radius: 4px
    background: var(--item-second-color)
    height: 36px
    position: absolute
    bottom: 0

  &.first:before
    left: 0

  &:not(.first):after
    right: 0

  &.down
    top: 36px

    &:after
      height: 60px
</style>
