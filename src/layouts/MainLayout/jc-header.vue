<template>
  <q-header>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="$stores.sidebar.left.toogle" />
      <!--        <dark-mode-toogle />-->

      <!-- TOPO - LOGO -->
      <q-toolbar-title>
        {{$stores.auth.$state.saasClient.company_name}}
      </q-toolbar-title>
      <q-toolbar-title>
        <CircularLogo />
      </q-toolbar-title>

      <!-- TOPO BOTÃO MENU DROPDOWN DIREITO -->
      <q-btn-dropdown :label="$stores.auth.$state?.user?.name" flat rounded icon="person" class="btn-left-top-menu" style="text-transform: none;">
        <q-list class="list-left-top-menu" dense>

          <!-- LINK MEEU PERFIL -->
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="alternate_email" />
            </q-item-section>
            <q-item-section>Meu Perfil</q-item-section>
          </q-item>

          <!-- LINK MENU FULLSCREEN -->
          <q-item clickable v-close-popup @click="toggle">
            <q-item-section avatar>
              <q-icon name="fullscreen" />
            </q-item-section>
            <q-item-section>Fullscreen</q-item-section>
          </q-item>

          <!-- LINK MENU SAIR -->
          <q-item clickable v-close-popup @click="$stores.auth.logout(router)">
            <q-item-section avatar>
              <q-icon name="door_front" />
            </q-item-section>
            <q-item-section>Sair</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <!-- BOTÃO ABRIR LATERAL DIREITA -->
      <q-btn
        flat
        dense
        round
        icon="question_mark"
        aria-label="Menu"
        @click="$stores.sidebar.right.toogle"
      />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
// import DarkModeToogle from 'components/DarkModeToggle.vue'
import { CircularLogo } from '@/components'
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'

const { toggle } = useFullscreen()
const router = useRouter()
</script>

<style lang="scss" scoped>

// TOPO
.q-header {
  left: 0px !important;

  $border-radius: 100%;
  -webkit-border-bottom-right-radius: $border-radius;
  -webkit-border-bottom-left-radius: $border-radius;
  -moz-border-radius-bottomright: $border-radius;
  -moz-border-radius-bottomleft: $border-radius;
  border-bottom-right-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  .q-toolbar {
    margin-bottom: 15px;
    margin-top: -5px;
  }
  .ctn-circular-logo {
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: -15px;
    transition: all 0.1s linear;

    &:hover {
      width: 120px;
      height: 120px;
      margin-left: -60px;
      padding: 20px 13px 10px 10px;
      opacity: 0.8;
      top: 3px;
    }
  }
  .btn-left-top-menu {
    padding:  0px 6px;
    .q-btn-dropdown__arrow {
      display: none;
    }
  }
}
</style>
