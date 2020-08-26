export default {
  methods: {
    addTags (tagId, pomodoroId, hash) {
      const formData = new FormData()

      formData.set('tag_id', tagId)
      formData.set('pomodoro_id', pomodoroId)
      formData.set('profile_hash', hash)

      return this.$axios.post(this.$urlApi + '/tags/add', formData)
    },
    createPomodoro (seconds, hash) {
      const formData = new FormData()

      formData.set('seconds', seconds)
      formData.set('profile_hash', hash)

      return this.$axios.post(this.$urlApi + '/pomodoros', formData)
    },
    deleteTag (tagId, hash) {
      return this.$axios.delete(this.$urlApi + '/tags', {
        data: {
          tag_id: tagId,
          hash
        }
      })
    },
    createTag (hash, tag) {
      const formData = new FormData()

      formData.set('name', tag)
      formData.set('profile_hash', hash)

      return this.$axios.post(this.$urlApi + '/tags', formData)
    },
    getLatestsPomodorosByHash (hash) {
      return this.$axios.get(`${this.$urlApi}/pomodoros/${hash}/months/last`)
    },
    getUserByHash (hash) {
      return this.$axios.get(`${this.$urlApi}/users/${hash}`)
    },
    getUserByEmail (email) {
      const formData = new FormData()

      formData.set('email', email)

      return this.$axios.post(this.$urlApi + '/register', formData)
    }
  }
}
