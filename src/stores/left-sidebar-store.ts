import { defineStore } from 'pinia'

export const leftSidebarStore = defineStore('leftSidebarStore', {
  state: () => ({
    open: false as boolean
  }),
  actions: {
    async toogle () {
      this.$patch({
        open: !this.$state.open
      })
    }
  },
  persist: true
})
