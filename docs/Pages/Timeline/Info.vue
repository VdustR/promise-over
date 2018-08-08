<template lang="pug">
  .info
    .label ResponseTime
    .value {{responseTime ? `${responseTime/1000}s` : 0}}
    .label Over
    .value {{over ? `${over/1000}s` : 0}}
    .label Timeout
    .value {{timeout ? `${timeout/1000}s` : 0}}
    .label Expire
    .value {{expire ? `${expire/1000}s` : 0}}
</template>

<script>
export default {
  name: 'Info',
  props: [
    'responseTime',
    'over',
    'timeout',
    'expire'
  ]
}
</script>

<style lang="sass" scoped>
.info
  display: grid
  grid-template-columns: repeat(2, auto [col-start])
  padding: 8px
  background: var(--item-color)
  color: var(--color)
  border: 1px solid #a8c8b9
  border-radius: 12px

.label
  text-align: right

  &:after
    content: ''
    margin-right: 4px

.value
  text-align: left
  font-weight: bold

.value
  min-width: 32px
</style>
