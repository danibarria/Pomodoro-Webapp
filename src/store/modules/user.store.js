const UserStore = {

  state: {
    email: null,
    profile_hash: null
  },

  getters: {
    getEmail (state) {
      return state.email
    },
    getProfileHash (state) {
      return state.profile_hash
    }
  },

  mutations: {
    setEmail (state, email) {
      state.email = email
    },
    setProfileHash (state, profileHash) {
      state.profile_hash = profileHash
    }
  },

  actions: {
    setEmail (context, payload) {
      context.commit('setEmail', payload)
    },
    setProfileHash (context, payload) {
      context.commit('setProfileHash', payload)
    }
  }

}

export default UserStore
