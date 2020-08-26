import timer from '../timer.mixin'
import requests from '../requests.mixin'

export default {
  props: ['hash'],
  mixins: [timer, requests],
  name: 'PageIndex',

  created () {
    this.getUserByHash(this.hash)
      .then(res => {
        const { data: { tags } } = res
        this.tags = tags
      })
  }
}
