<template>
  <div class="page-title">
    Dashboard
  </div>
  <q-page>
    <!-- <div v-if="user">
      <div>Hello {{ user.user_metadata.name }}</div>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
// import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageMe',
  components: {
    // CardDashboard: defineAsyncComponent(() => import('components/CardDashbaord.vue'))
  },
  setup () {
    // const { user } = useAuthUser()

    return {
      // user
    }
  }
})
</script>
