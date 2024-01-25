<template>
  <q-list  class="text-blue-grey-14 ctn-menu-main" :class="[{'menu-mini': props.mini}]">

    <!-- MENU ITEM - ADMIN -->
    <q-item clickable :to="{ name: 'home' }" active-class="text-purple-14" class="q-mb-xs menu-item">
      <q-item-section avatar>
        <icon icon="ion:home" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Home</q-item-section>
    </q-item>

    <q-separator />

    <!-- MENU ITEM - ADMIN -->
    <q-item clickable :to="{ name: 'admin' }" active-class="text-purple-14" class=" q-mt-xs">
      <q-item-section avatar>
        <icon icon="eos-icons:admin-outlined" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Administrativo</q-item-section>
    </q-item>

    <!-- MENU ITEM CONVIDADOS -->
    <q-item clickable :to="{ name: 'users' }" active-class="text-purple-14" v-close-popup>
      <q-item-section avatar>
        <icon icon="fontisto:person" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Usuários</q-item-section>
    </q-item>

    <!-- MENU ITEM RECEPCIONISTA -->
    <q-item clickable :to="{ name: 'receptionists' }" active-class="text-purple-14" v-close-popup>
      <q-item-section avatar>
        <icon icon="bi:person-badge-fill" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Recepcionista</q-item-section>
    </q-item>

    <!-- MENU ITEM PROMOTERS -->
    <q-item clickable :to="{ name: 'promoters' }" active-class="text-purple-14" v-close-popup>
      <q-item-section avatar>
        <icon icon="fluent:person-voice-20-filled" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Promoters</q-item-section>
    </q-item>

    <!-- MENU ITEM EVENTOS -->
    <q-item clickable :to="{ name: 'events' }"  v-close-popup active-class="text-purple-14" class="q-mb-xs">
      <q-item-section avatar>
        <icon icon="tabler:calendar-star" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Eventos</q-item-section>
    </q-item>

    <q-separator />

    <q-item class="q-mt-xs" style="display: none;">
      <q-item-section>
        <q-item-label caption>
          Evento Fixado:
        </q-item-label>
        <q-item-label class="hide-in-animate text-overline">
          {{$stores.events.fixedEvent.name}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <!-- MENU ITEM - LISTAS DE EVENTOS -->
    <q-item clickable :to="{ name: 'eventsLists' }" active-class="text-purple-14"  v-close-popup style="display: none;">
      <q-item-section avatar>
        <icon icon="material-symbols:patient-list" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Lista de Eventos</q-item-section>
    </q-item>

    <!-- MENU ITEM CONVIDADOS -->
    <q-item clickable :to="{ name: 'eventsListsItems' }" active-class="text-purple-14"  v-close-popup class="q-mb-xs" style="display: none;">
      <q-item-section avatar>
        <icon icon="fluent:person-heart-24-filled" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Nomes e Convidados</q-item-section>
    </q-item>

    <q-separator style="display: none;" />

    <!-- MENU ITEM - SAIR -->
    <q-item clickable @click="$stores.auth.logout(router)" class="q-mt-xs">
      <q-item-section avatar>
        <q-icon name="door_front" />
      </q-item-section>
      <q-item-section class="hide-in-animate">Sair</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'
import { defineProps, withDefaults } from 'vue/dist/vue'
const router = useRouter()

const props = withDefaults(defineProps<{
  mini: boolean
}>(), {
  mini: false
})
</script>

<style lang="scss">

.ctn-menu-main {
  &.menu-mini {
    .q-item {
      .hide-in-animate {
        transition: all 0.15s linear !important;
        margin-top: 10px !important;
        background-color: var(--q-primary) !important;
        color: #FFF !important;
        border: 1px solid #CCC !important;
        border-left: 0px !important;
        left: 55px !important;
        font-size: 15px !important;
        -webkit-border-top-right-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        -moz-border-radius-topright: 10px;
        -moz-border-radius-bottomright: 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        display: block !important;
        width: 0 !important;
        overflow: hidden;
        position: fixed !important;
        z-index: 999 !important;
        opacity: 0;
        right: -200px !important;
        max-width: max-content !important;
        box-shadow: 5px 0px 10px #FFF;
      }
      &:hover {
        &:not(.q-router-link--exact-active){
          .hide-in-animate {
            width: 200px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
            opacity: 1;
          }
        }
      }
    }
  }
  .iconify {
    transition: transform linear 0.2s;
  }
  .q-item {
    transition: all 0.5s linear;
    .menu-item {
      transition: all 0.3s linear !important;
    }

    &:hover {
      .iconify {
        transition: transform linear 0.1s;
        transform: scale(1.2);
      }
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
</style>
