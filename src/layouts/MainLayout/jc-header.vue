<template>
  <q-header>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="$stores.sidebar.left.toogle" />
      <!--        <dark-mode-toogle />-->

      <!-- TOPO - LOGO -->
      <q-toolbar-title v-show="!$q.screen.xs && !$q.screen.sm">
        {{$stores.auth.$state?.saas_client?.company_name ?? 'Listme'}}
      </q-toolbar-title>
      <q-toolbar-title>
        <CircularLogo />
      </q-toolbar-title>

      <!-- TOPO BOTÃO MENU DROPDOWN DIREITO -->
      <q-btn-dropdown :label="$q.screen.xs || $q.screen.sm ? '' : $stores.auth.$state?.user?.name" flat rounded icon="person" class="btn-left-top-menu" style="text-transform: none;">
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
</style>
