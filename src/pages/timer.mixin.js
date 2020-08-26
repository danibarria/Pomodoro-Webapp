import requests from './requests.mixin'
export default {
  mixins: [requests],
  data () {
    return {
      tags: [],
      tagsSelected: [],
      timer: null,
      paused: true,
      totalTime: 25 * 60,
      time: 25 * 60,
      secondsInterval: 1000, // miliseconds
      // experimental
      audioCtx: null
    }
  },
  created () {
    // create audio context object, for each browser has it owns API
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    beep (duration, frequency, volume, type, callback) {
      // https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
      const oscillator = this.audioCtx.createOscillator()
      const gainNode = this.audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioCtx.destination)

      if (volume) gainNode.gain.value = volume
      if (frequency) oscillator.frequency.value = frequency
      if (type) oscillator.type = type
      if (callback) oscillator.onended = callback

      oscillator.start(this.audioCtx.currentTime)
      oscillator.stop(this.audioCtx.currentTime + ((duration || 500) / 1000))
    },
    countDown () {
      this.time--
      if (this.time <= 0) {
        this.paused = true
        clearInterval(this.timer)
        // make a noise
        this.melody()
        // save pomodoro in db if it has a user
        if (this.profileHashStore) {
          this.createPomodoro(this.totalTime, this.profileHashStore)
            .then(res => {
              const { data: { id } } = res
              this.tagsSelected.forEach(el => {
                const [tagId, pomodoroId, hash] = [el.id, id, this.profileHashStore]

                this.addTags(tagId, pomodoroId, hash)
              })
            })
        }
        // finished, congratz
        this.$q.dialog({
          title: 'Felicitaciones',
          message: '¡Terminaste tu Pomodoro! ✨ Podes tomarte un descanso o hacer otro pomodoro.'
        })
          .onOk(() => {
            // reset timer
            this.time = this.totalTime
            // reset tags
            this.tagsSelected = []
            // getTags if has user
            if (this.profileHashStore) {
              this.getUserByHash(this.hash)
                .then(res => {
                  const { data: { tags } } = res

                  this.tags = tags
                })
            }
          })
      }
    },
    melody () {
      const notes = [300, 400, 500]
      const times = [0, 500, 1000]

      times.forEach((time, index) => {
        setTimeout(() => {
          this.beep(null, notes[index])
        }, time)
      })
    },
    toggleTimer () {
      if (this.paused) {
        // ver feedback inmediato
        this.time--
        // cuando esta pausado activar
        this.timer = setInterval(this.countDown, this.secondsInterval)
      } else {
        // cuando no esta pausado
        clearInterval(this.timer)
      }
      // cambiar el valor
      this.paused = !this.paused
    },
    resetTimer () {
      this.paused = true
      clearInterval(this.timer)

      this.$q.dialog({
        title: 'Reiniciar pomodoro',
        message: '¿Seguro que queres reiniciar el pomodoro?',
        cancel: true,
        persistent: true
      })
        .onOk(() => {
          // restore default values
          this.totalTime = 25 * 60 // 25 minutos
        })
    },
    addSelectedAndRemoveTag (tag) {
      this.tagsSelected.push(tag)
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    removeSelectedAndAddTag (tag) {
      this.tags.push(tag)
      this.tagsSelected.splice(this.tagsSelected.indexOf(tag), 1)
    }
  },
  watch: {
    totalTime (newValue) {
      this.time = newValue
    }
  },
  computed: {
    totalTimeLeft () {
      return (this.time * 100) / this.totalTime
    },
    startStopIcon () {
      return this.paused ? 'play_arrow' : 'pause'
    },
    startStopText () {
      return this.paused ? 'Empezar' : 'Pausar'
    },
    // agregarle 0 a los minutos < 10
    minutes () {
      const time = parseInt(this.time / 60)
      if (time < 10) {
        return '0' + time
      } else {
        return time
      }
    },
    // agregarle 0 a los segundos < 10
    seconds () {
      const time = this.time % 60
      if (time < 10) {
        return '0' + time
      } else {
        return time
      }
    },
    profileHashStore () {
      return this.$store.getters.getProfileHash
    }
  }
}
