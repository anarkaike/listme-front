<template>
  <q-layout class="ctn-login-layout" view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <div class="inline-block ctn-logo">
            <CircularLogo />
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md">
      <q-card class="card-page-content" flat>
        <router-view />
      </q-card>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
// import { defineComponent } from 'vue'//, onMounted
// import { useApi } from '@composables'
import { CircularLogo } from '@/components'
//
// export default defineComponent({
//   name: 'LoginLayout',
//   components: { CircularLogo },
//   setup () {
//     // const { getBrand } = useApi()
//     // onMounted(() => {
//     //   // getBrand()
//     // })
//     return {
//     }
//   }
// })
</script>
<style scoped lang="scss">
.ctn-login-layout {
  background-image: url('./src/assets/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  .q-header {
    -webkit-border-bottom-right-radius: 100%;
    -webkit-border-bottom-left-radius: 100%;
    -moz-border-radius-bottomright: 100%;
    -moz-border-radius-bottomleft: 100%;
    border-bottom-right-radius: 100%;
    border-bottom-left-radius: 100%;
    .ctn-logo {
      width: 100px;
      > * {
        position:absolute; z-index: 9; top: 0px;
      }
    }
  }
  .q-page-container {
    padding-top: 110px !important;
    .card-page-content {
      max-width: 400px;
      margin: auto;
      height: auto;
      background-color: var(--bg-transparent-4);
    }
  }
}
</style>
