<template>
  <mobile :hash="this.hash" v-if="$q.screen.lt.sm" />
  <desktop :hash="this.hash" v-else />
</template>

<script>
import desktop from './desktop'
import mobile from './mobile'

export default {
  props: ['hash'],
  name: 'Index',
  components: {
    desktop,
    mobile
  }
}
</script>
