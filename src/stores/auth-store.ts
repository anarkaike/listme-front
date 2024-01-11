import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    user: null,
    user_impersonation: null
  }),
  // getters: {
  //
  // },
  actions: {
    // login () {
    //
    // }
  }
})
