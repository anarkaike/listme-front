import { defineStore } from 'pinia'

export const rightSidebarStore = defineStore('rightSidebarStore', {
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
