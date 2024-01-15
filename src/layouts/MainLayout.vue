<template>
  <q-layout class="ctn-main-layout">
    <!-- LATERAL ESQUERDA - MENU -->
    <q-drawer v-model="sideBars.left" show-if-above bordered :width="250">

      <q-list  class="text-blue-grey-14 ctn-menu-main">
        <!-- MENU - TITULO -->
        <q-item-label class="title" header>
          Menu
        </q-item-label>

        <!-- MENU ITEM - ADMIN -->
        <q-item clickable :to="{ name: 'home' }" active-class="text-purple-14">
          <q-item-section avatar>
            <icon icon="ion:home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <!-- MENU ITEM - ADMIN -->
        <q-item clickable :to="{ name: 'admin' }" active-class="text-purple-14">
          <q-item-section avatar>
            <icon icon="eos-icons:admin-outlined" />
          </q-item-section>
          <q-item-section>Administradores</q-item-section>
        </q-item>

        <!-- MENU ITEM CONVIDADOS -->
        <q-item clickable v-close-popup @click="toggle">
          <q-item-section avatar>
            <icon icon="fontisto:person" />
          </q-item-section>
          <q-item-section>Usuários</q-item-section>
        </q-item>

        <!-- MENU ITEM RECEPCIONISTA -->
        <q-item clickable v-close-popup @click="toggle">
          <q-item-section avatar>
            <icon icon="bi:person-badge-fill" />
          </q-item-section>
          <q-item-section>Recepcionista</q-item-section>
        </q-item>

        <!-- MENU ITEM PROMOTERS -->
        <q-item clickable v-close-popup @click="toggle">
          <q-item-section avatar>
            <icon icon="fluent:person-voice-20-filled" />
          </q-item-section>
          <q-item-section>Promoters</q-item-section>
        </q-item>

        <!-- MENU ITEM EVENTOS -->
        <q-item clickable v-close-popup @click="toggle">
          <q-item-section avatar>
            <icon icon="tabler:calendar-star" />
          </q-item-section>
          <q-item-section>Eventos</q-item-section>
        </q-item>

        <!-- MENU ITEM - EVENTOS -->
        <q-item clickable v-close-popup @click="toggle">
          <q-item-section avatar>
            <icon icon="material-symbols:patient-list" />
          </q-item-section>
          <q-item-section>Lista de Eventos</q-item-section>
        </q-item>

        <!-- MENU ITEM CONVIDADOS -->
        <q-item clickable v-close-popup @click="toggle">
          <q-item-section avatar>
            <icon icon="fluent:person-heart-24-filled" />
          </q-item-section>
          <q-item-section>Nomes e Convidados</q-item-section>
        </q-item>

        <!-- MENU ITEM - SAIR -->
        <q-item clickable v-close-popup @click="methods.logout">
          <q-item-section avatar>
            <q-icon name="door_front" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- LATERAL DIREITA - VER O QUE SERA AINDA -->
    <q-drawer v-model="sideBars.right" bordered :width="250" side="right">
      <!-- TITULO -->
      <q-list>
        <q-item-label class="title" header>
          Informações & Ajuda
        </q-item-label>
      </q-list>
    </q-drawer>

    <!-- TOPO -->
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="methods.sideBase.toogleLeft" />
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
            <q-item clickable v-close-popup @click="enter">
              <q-item-section avatar>
                <q-icon name="fullscreen" />
              </q-item-section>
              <q-item-section>Fullscreen</q-item-section>
            </q-item>

            <!-- LINK MENU SAIR -->
            <q-item clickable v-close-popup @click="methods.logout">
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
          @click="methods.sideBase.toogleRight"
        />
      </q-toolbar>
    </q-header>

    <!-- CONTEUDO -->
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

    <!-- RODAPE -->
    <q-footer>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script lang="ts" setup>
// import DarkModeToogle from 'components/DarkModeToggle.vue'
import { CircularLogo } from '@/components'
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { $stores } from '@/stores/all'

// CONSTANTES
const { toggle } = useFullscreen()
const $q = useQuasar()
const router = useRouter()
const sideBars = ref<{left: boolean, right: boolean}>({
  left: false,
  right: false
})

// METODOS
const methods = {
  sideBase: {
    toogleLeft () {
      sideBars.value.left = !sideBars.value.left
    },
    toogleRight () {
      sideBars.value.right = !sideBars.value.right
    }
  },
  async logout () {
    $q.dialog({
      title: 'Sair do sistema?',
      message: 'Deseja realmente encerrar seu acesso?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      $stores.auth.logout().then(() => {
        router.push({ name: 'login' })
      })
    })
  }
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
  background-image: url('/imgs/bg.jpg');
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
    background-color: var(--bg-transparent-5) !important;
    .title {
      background-color: var(--title-bg-drawer);
      border-bottom: 1px solid rgba(110, 0, 132, 0.3);
      font-weight: bold;
      color: var(--primary) !important;
      text-align: center;
      padding: 10px;
    }
    &.q-drawer--left {
      //margin-top: 60px;
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
.q-router-link--exact-active {
  background-color: #eceaed;
  box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.1);
  * {
    color: #853196;
  }
}
.ctn-menu-main {
  .iconify {
    transition: transform linear 0.2s;
  }
  .q-item {
    &:hover {
      .iconify {
        transition: transform linear 0.1s;
        transform: scale(1.2);
      }
    }
  }
}
</style>
