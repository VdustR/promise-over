<template lang="pug">
  #app
    Introduction
    Timeline
</template>

<script>
import Timeline from 'Docs/Pages/Timeline'
import Introduction from 'Docs/Pages/Introduction'

export default {
  name: 'app',
  components: {
    Introduction,
    Timeline
  }
}
</script>

<style lang="sass" scoped>
#app
  max-width: 720px
  margin: 0 auto
</style>
