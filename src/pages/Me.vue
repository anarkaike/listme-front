<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      Dashboard
    </div>
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
