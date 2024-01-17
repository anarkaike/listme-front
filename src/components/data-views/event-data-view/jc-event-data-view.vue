<template>
  <div class="ctn-jc-data-view row reverse jc-data-view">
    <!-- COLUNA DE INFOS -->
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">

      <!-- TITULOS DAS ABAS -->
      <q-tabs
        v-model="tabDataView"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >

        <!-- ABA PRINCIPAL -->
        <q-tab name="main">
          <div class="row q-px-sm">
            <icon icon="streamline:news-paper" class="only-mobile" />
            <span class="only-desktop text-subtitle2 q-ml-sm">Geral</span>
          </div>
        </q-tab>

        <!-- ABA LOCAL -->
        <q-tab name="location">
          <div class="row q-px-sm">
            <icon icon="typcn:location-outline" class="only-mobile" />
            <span class="only-desktop text-subtitle2 q-ml-sm">Local</span>
          </div>
        </q-tab>

        <!-- ABA INFO -->
        <q-tab name="additionalInfo">
          <div class="row q-px-sm">
            <icon icon="icon-park-outline:more-two" class="only-mobile" />
            <span class="only-desktop text-subtitle2 q-ml-sm">Infos</span>
          </div>
        </q-tab>

        <!-- ABA DESCRIÇÃO -->
        <q-tab name="description">
          <div class="row q-px-sm">
            <icon icon="fluent:text-description-24-filled" class="only-mobile" />
            <span class="only-desktop text-subtitle2 q-ml-sm">Descrição</span>
          </div>
        </q-tab>

        <!-- ABA BANNER -->
        <q-tab name="banner" class="only-mobile">
          <div class="row q-px-sm">
            <icon icon="akar-icons:image" class="only-mobile" />
            <span class="only-desktop text-subtitle2 q-ml-sm">Banner</span>
          </div>
        </q-tab>

        <!-- ABA LISTAS E CONVIDADOS -->
        <q-tab name="eventLists">
          <div class="row q-px-sm">
            <icon icon="material-symbols:patient-list" class="only-mobile" />
            <span class="only-desktop text-subtitle2 q-ml-sm">LISTAS</span>
          </div>
        </q-tab>
      </q-tabs>

      <q-separator />

      <!-- CONTEUDOS DAS ABAS -->
      <q-tab-panels v-model="tabDataView" animated>

        <!-- CONTEUDO ABA PRINCIPAL -->
        <q-tab-panel name="main">
          <JcEventMain :row="row"  />
        </q-tab-panel>

        <!-- CONTEUDO ABA LOCAL -->
        <q-tab-panel name="location">
          <JcEventLocal :row="row" />
        </q-tab-panel>

        <!-- CONTEUDO ABA INFO -->
        <q-tab-panel name="additionalInfo">
          <JcEventInfo :row="row" />
        </q-tab-panel>

        <!-- CONTEUDO ABA DESCRIÇÃO -->
        <q-tab-panel name="description">
          <JcEventDescription :row="row" />
        </q-tab-panel>

        <!-- CONTEUDO ABA BANNER -->
        <q-tab-panel name="banner" class="only-mobile">
          <JcEventBanner :row="row" />
        </q-tab-panel>

        <!-- CONTEUDO ABA BANNER -->
        <q-tab-panel name="eventLists">
          <JcEventLists :row="row" />
        </q-tab-panel>

      </q-tab-panels>

    </div>

    <!-- COLUNA DE FOTO, STATUS E AUDITORIA -->
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none only-desktop">
      <JcEventBanner :row="row" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'
import type { IEvent } from '@/interfaces'
import {
  JcEventMain,
  JcEventLocal,
  JcEventInfo,
  JcEventDescription,
  JcEventBanner,
  JcEventLists
} from './components'

// CONSTANTES ---------------------------------------------------
const props = withDefaults(defineProps<{ row: IEvent }>(), {})
const emit = defineEmits<{(e: 'update:row', row: IEvent): void}>()
const row = ref<IEvent>(props.row)
const tabDataView = ref('main')

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:row', row.value)
})

// METODOS ---------------------------------------------------
// const methods = {}
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
