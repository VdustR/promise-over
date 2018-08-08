<template lang="pug">
  .promise-over
    h2 Timeline
    DemoProgress(v-for="(data, index) in dummy" :key="index" :data="data")
</template>

<script>
import DemoProgress from './DemoProgress'

export default {
  name: 'PromiseOver',
  data () {
    return {
      dummy: [[
        /* response, over, timeout, expire */
        1
      ], [
        1, 2
      ], [
        3, 1, 2
      ], [
        3, null, 1, 2
      ], [
        2, null, 3, 1
      ], [
        1, null, 3, 2
      ]]
    }
  },
  components: {
    DemoProgress
  }
}
</script>

<style lang="sass" scoped>
h1
  color: var(--color)
</style>
