import Chart from 'chart.js'
import requests from '../requests.mixin'
export default {
  props: ['hash'],
  mixins: [requests],
  data () {
    return {
      tagName: null,
      tags: [],
      pomodoros: [],
      myDataSet: {},
      chart: null
    }
  },
  created () {
    this.getPomodoros()
    this.getTags()
  },
  methods: {
    rgbaRandomColors (times) {
      const colors = []
      for (let index = 0; index < times; index++) {
        const [r, g, b, a] = [
          Math.floor(Math.random() * 255) + 1,
          Math.floor(Math.random() * 255) + 1,
          Math.floor(Math.random() * 255) + 1,
          80
        ]
        colors.push(`rgba(${r}, ${g}, ${b}, ${a})`)
      }
      return colors
    },
    configDoughnut () {
      const { $refs: { chart } } = this
      this.chart = new Chart(chart, {
        type: 'doughnut',
        data: {
          labels: [...Object.keys(this.myDataSet)],
          datasets: [{
            data: [...Object.values(this.myDataSet)],
            backgroundColor: this.rgbaRandomColors(this.tags.length + 1)
          }]
        }
      })
    },
    getPomodoros () {
      return this.getLatestsPomodorosByHash(this.profileHashStore)
        .then(res => {
          const { data } = res
          this.pomodoros = data
          this.pomodoros.forEach(pomodoro => {
            const { seconds, tags } = pomodoro
            // unknown
            if (tags.length) {
              tags.forEach(tag => {
                if (this.myDataSet[tag.name]) {
                  this.myDataSet[tag.name] = this.myDataSet[tag.name] + (seconds / 60)
                } else {
                  this.myDataSet[tag.name] = (seconds / 60)
                }
              })
            } else {
              if (this.myDataSet.Desconocido) {
                this.myDataSet.Desconocido = this.myDataSet.Desconocido + (seconds / 60)
              } else {
                this.myDataSet.Desconocido = (seconds / 60)
              }
            }
          })
        })
        .finally(() => {
          this.configDoughnut()
        })
    },
    onDeleteTag (tagId) {
      this.$q.loading.show({ delay: 400 })

      this.deleteTag(tagId, this.hash)
        .finally(() => {
          this.$q.loading.hide()
          this.getTags()
        })
    },
    onSubmitTag () {
      const { tagName, hash } = this

      this.$q.loading.show({ delay: 400 })
      this.createTag(hash, tagName)
        .finally(() => {
          this.$q.loading.hide()
          this.getTags()
        })
    },
    getTags () {
      this.getUserByHash(this.hash)
        .then(res => {
          const { data: { tags } } = res

          this.tags = tags
        })
    }
  },
  computed: {
    emailStore () {
      return this.$store.getters.getEmail
    },
    profileHashStore () {
      return this.$store.getters.getProfileHash
    }
  }
}
