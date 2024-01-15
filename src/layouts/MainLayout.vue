<template>
  <q-layout class="ctn-main-layout">

    <!-- LATERAIS DIREITA E ESQUERDA -->
    <JcLeftSidebar />
    <JcRightSidebar />

    <!-- TOPO -->
    <JcHeader />

    <!-- CONTEUDO -->
    <q-page-container>
      <div>
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </q-page-container>

    <!-- RODAPE -->
    <JcFooter />

  </q-layout>
</template>

<script lang="ts" setup>
import {
  JcHeader,
  JcFooter,
  JcLeftSidebar,
  JcRightSidebar
} from './MainLayout/'

// CONSTANTES

// METODOS
// const methods = {}
</script>
<style lang="scss">
.ctn-main-layout {
  background-image: url('/imgs/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  $border-radius: 100%;

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

}
</style>
