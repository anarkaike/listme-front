<template>
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

    <!-- MENU ITEM CONVIDADOS -->
    <q-item clickable :to="{ name: 'users' }" active-class="text-purple-14" v-close-popup>
      <q-item-section avatar>
        <icon icon="fontisto:person" />
      </q-item-section>
      <q-item-section>Usuários</q-item-section>
    </q-item>

    <!-- MENU ITEM RECEPCIONISTA -->
    <q-item clickable :to="{ name: 'receptionists' }" active-class="text-purple-14" v-close-popup>
      <q-item-section avatar>
        <icon icon="bi:person-badge-fill" />
      </q-item-section>
      <q-item-section>Recepcionista</q-item-section>
    </q-item>

    <!-- MENU ITEM PROMOTERS -->
    <q-item clickable :to="{ name: 'promoters' }" active-class="text-purple-14" v-close-popup>
      <q-item-section avatar>
        <icon icon="fluent:person-voice-20-filled" />
      </q-item-section>
      <q-item-section>Promoters</q-item-section>
    </q-item>

    <!-- MENU ITEM EVENTOS -->
    <q-item clickable :to="{ name: 'events' }"  v-close-popup>
      <q-item-section avatar>
        <icon icon="tabler:calendar-star" />
      </q-item-section>
      <q-item-section>Eventos</q-item-section>
    </q-item>

    <!-- MENU ITEM - LISTAS DE EVENTOS -->
    <q-item clickable :to="{ name: 'eventsLists' }"  v-close-popup>
      <q-item-section avatar>
        <icon icon="material-symbols:patient-list" />
      </q-item-section>
      <q-item-section>Lista de Eventos</q-item-section>
    </q-item>

    <!-- MENU ITEM CONVIDADOS -->
    <q-item clickable :to="{ name: 'eventsListsItems' }"  v-close-popup>
      <q-item-section avatar>
        <icon icon="fluent:person-heart-24-filled" />
      </q-item-section>
      <q-item-section>Nomes e Convidados</q-item-section>
    </q-item>

    <!-- MENU ITEM - ADMIN -->
    <q-item clickable :to="{ name: 'admin' }" active-class="text-purple-14">
      <q-item-section avatar>
        <icon icon="eos-icons:admin-outlined" />
      </q-item-section>
      <q-item-section>Administrativo</q-item-section>
    </q-item>

    <!-- MENU ITEM - SAIR -->
    <q-item clickable @click="$stores.auth.logout(router)">
      <q-item-section avatar>
        <q-icon name="door_front" />
      </q-item-section>
      <q-item-section>Sair</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
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
