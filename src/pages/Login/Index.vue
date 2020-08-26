<template>
  <mobile v-if="$q.screen.lt.sm" />
  <desktop v-else />
</template>

<script>
import desktop from './desktop'
import mobile from './mobile'

export default {
  name: 'Index',
  components: {
    desktop,
    mobile
  }
}
</script>
