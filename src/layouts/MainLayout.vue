<template>
  <q-layout class="jc-layout-main" view="hHh lpR fFf">

    <!-- LATERAIS DIREITA E ESQUERDA -->
    <JcLeftSidebar />
    <JcRightSidebar />

    <!-- TOPO -->
    <JcHeader />

    <!-- CONTEUDO -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <q-page>
            <div class="jc-layout-content q-ma-xs q-mt-lg q-ma-sm-md">
              <component :is="Component" />
            </div>
          </q-page>
        </transition>
      </router-view>
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
.qqjc-layout-main {
  background-image: url('/imgs/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  $border-radius: 100%;

  // CONTEUDO
  .qqq-page-container {
    //margin: 10px 20px;
    //margin-left: 210px;
    .q-page {
      background-color: var(--bg-transparent-5) !important;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      > div {
        min-height: calc(100vh - 224px) !important;
      }
    }
  }

}
</style>
