<template>
  <q-layout view="lHh Lpr lFf" class="ctn-main-layout">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
    >
      <q-list>
        <q-item-label class="title"
          header
        >
          Menu
        </q-item-label>
        <q-item clickable :to="{ name: 'admin' }">
          <q-item-section avatar>
            <q-icon name="admin_panel_settings" />
          </q-item-section>
          <q-item-section>Administradores</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="handleFullscren">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Usuários</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="handleFullscren">
          <q-item-section avatar>
            <q-icon name="calendar_month" />
          </q-item-section>
          <q-item-section>Eventos</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="handleLogout">
          <q-item-section avatar>
            <q-icon name="door_front" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      bordered
      :width="250"
      side="right"
    >
      <q-list>
        <q-item-label class="title"
          header
        >
          Informações & Ajuda
        </q-item-label>
      </q-list>
    </q-drawer>
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <dark-mode-toogle />

        <q-toolbar-title>
          <CircularLogo />
        </q-toolbar-title>

        <q-btn-dropdown :label="authStore().$state.user.name" flat rounded icon="person" class="btn-left-top-menu" style="text-transform: none;">
          <q-list class="list-left-top-menu" dense>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="alternate_email" />
              </q-item-section>
              <q-item-section>Meu Perfil</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleFullscren">
              <q-item-section avatar>
                <q-icon name="fullscreen" />
              </q-item-section>
              <q-item-section>Fullscreen</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section avatar>
                <q-icon name="door_front" />
              </q-item-section>
              <q-item-section>Sair</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          flat
          dense
          round
          icon="question_mark"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div>
        <router-view v-slot="{ Component }">
          <transition
            appear
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>{{rightDrawerOpen}}</q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script lang="ts" setup>
// import EssentialLink from 'components/EssentialLink.vue'
import DarkModeToogle from 'components/DarkModeToggle.vue'
import { CircularLogo } from '@/components'
import { useFullscreen } from '@vueuse/core'

// const linksList = [
//   {
//     title: 'Home',
//     caption: '',
//     icon: 'mdi-home',
//     routeName: 'me'
//   }
// ]

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { authStore } from '@/stores/auth-store'
import useLoading from '@/composables/useLoading'
const { toggle } = useFullscreen()
// import useAuthUser from 'src/composables/UseAuthUser'
// import useApi from 'src/composables/UseApi'

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const { showLoading, hideLoading } = useLoading()

const $q = useQuasar()
const router = useRouter()
// const { logout } = useAuthUser()
// const { getBrand } = useApi()

onMounted(() => {
  // getBrand()
})

const handleLogout = async () => {
  $q.dialog({
    title: 'Sair do sistema?',
    message: 'Deseja realmente encerrar seu acesso?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    showLoading('Saindo...')
    authStore().logout().then(() => {
      hideLoading()
      router.push({ name: 'login' })
    })
  })
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
const handleFullscren = () => {
  toggle()
}
</script>
<style lang="scss">
.body--light {
  --title-bg-drawer: rgba(255, 255, 255, 0.4);
}
.body--dark {
  --title-bg-drawer: rgba(0, 0, 0, 0.4);
}
.ctn-main-layout {
  background-image: url('./src/assets/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  $border-radius: 100%;
  $border-radius-menu: 10px;

  // TOPO
  .q-header {
    left: 0px !important;

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

  // MENU
  .q-drawer {
    //border: 5px solid red !important;
    background-color: var(--bg-transparent-3) !important;
    .title {
      background-color: var(--title-bg-drawer);
      border-bottom: 1px solid rgba(110, 0, 132, 0.3);
      font-weight: bold;
      color: var(--primary) !important;
      text-align: center;
      padding: 10px;
    }
    &.q-drawer--left {
      margin-top: 60px;
      margin-left: 0px;
      margin-bottom: 60px;

      -webkit-border-top-right-radius: $border-radius-menu;
      -webkit-border-bottom-right-radius: $border-radius-menu;
      -moz-border-radius-topright: $border-radius-menu;
      -moz-border-radius-bottomright: $border-radius-menu;
      border-top-right-radius: $border-radius-menu;
      border-bottom-right-radius: $border-radius-menu;

      .title {
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-topright: 10px;
        border-top-right-radius: 10px;
      }
    }
    &.q-drawer--right {
      margin-right: 0px;

      -webkit-border-top-left-radius: 10px;
      -webkit-border-bottom-left-radius: 10px;
      -moz-border-radius-topleft: 10px;
      -moz-border-radius-bottomleft: 10px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

      .title {
        -webkit-border-top-left-radius: 10px;
        -moz-border-radius-topleft: 10px;
        border-top-left-radius: 10px;
      }
    }
    &.q-drawer--mobile {
      margin-top: 70px;
      margin-bottom: 70px;
    }
  }

  // CONTEUDO
  .q-page-container {
    //margin: 10px 20px;
    //margin-left: 210px;
    > div {
      margin: 10px 10px;
      padding: 16px;
      background-color: var(--bg-transparent-4) !important;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      .q-page {
        min-height: calc(100vh - 224px) !important;
      }
    }
  }

  // RODAPE
  .q-footer {
    left: 0px !important;

    -webkit-border-top-left-radius: $border-radius;
    -webkit-border-top-right-radius: $border-radius;
    -moz-border-radius-topleft: $border-radius;
    -moz-border-radius-topright: $border-radius;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;

    .q-toolbar {
      margin-top: 15px;
      margin-bottom: -5px;
    }
  }
}
.list-left-top-menu {
  color: var(--colors-purple-4);
}
</style>
