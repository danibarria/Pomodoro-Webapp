/* eslint-disable camelcase */
import requests from '../requests.mixin'
export default {
  mixins: [requests],
  data () {
    return {
      email: null,
      profileHash: null
    }
  },
  methods: {
    logout () {
      this.$q.dialog({
        title: 'Salir de mi cuenta',
        message: '¿Seguro que queres salir de la cuenta?',
        cancel: true,
        persistent: true
      })
        .onOk(() => {
          this.$store.dispatch('setEmail', null)
          this.$store.dispatch('setProfileHash', null)
        })
    },
    onSubmit () {
      const { email } = this

      this.$q.loading.show({ delay: 400 })
      this.getUserByEmail(email)
        .then(res => {
          const { data: { email, profile_hash } } = res
          this.profileHash = profile_hash
          this.$store.dispatch('setEmail', email)
          this.$store.dispatch('setProfileHash', profile_hash)
        })
        .finally(() => {
          this.$q.loading.hide()
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
