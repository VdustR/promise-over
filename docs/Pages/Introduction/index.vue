<template lang="pug">
  .introduction
    h1 promise-over
    p A promise extension for over duration, timeout, and expiration.
    a.github-corner(href="https://github.com/VdustR/promise-over" target="_blank")
      img(:src="githubCornerImg" alt="promise-over GitHub")
</template>

<script>
import githubCornerImg from 'Docs/assets/images/github-corner-right.svg'

export default {
  name: 'Introduction',
  data () {
    return {
      githubCornerImg
    }
  }
}
</script>

<style lang="sass" scoped>
.github-corner
  position: absolute
  top: 0
  right: 0
</style>
