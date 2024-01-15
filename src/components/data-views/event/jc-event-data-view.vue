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
          <JcEventMain :data="data"  />
        </q-tab-panel>

        <!-- CONTEUDO ABA LOCAL -->
        <q-tab-panel name="location">
          <JcEventLocal :data="data" />
        </q-tab-panel>

        <!-- CONTEUDO ABA INFO -->
        <q-tab-panel name="additionalInfo">
          <JcEventInfo :data="data" />
        </q-tab-panel>

        <!-- CONTEUDO ABA DESCRIÇÃO -->
        <q-tab-panel name="description">
          <JcEventDescription :data="data" />
        </q-tab-panel>

        <!-- CONTEUDO ABA BANNER -->
        <q-tab-panel name="banner" class="only-mobile">
          <JcEventBanner :data="data" />
        </q-tab-panel>

        <!-- CONTEUDO ABA BANNER -->
        <q-tab-panel name="eventLists">
          <JcEventLists :data="data" />
        </q-tab-panel>

      </q-tab-panels>

    </div>

    <!-- COLUNA DE FOTO, STATUS E AUDITORIA -->
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none only-desktop">
      <JcEventBanner :data="data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'
import type { IEvent } from '@/interfaces'
import { useHumanize } from '@/composables'
import {
  JcEventMain,
  JcEventLocal,
  JcEventInfo,
  JcEventDescription,
  JcEventBanner,
  JcEventLists
} from './details'

// CONSTANTES ---------------------------------------------------
const { humanizeDuration, humanizeDatetime } = useHumanize()
const props = withDefaults(defineProps<{ data: IEvent }>(), {})
const emit = defineEmits<{(e: 'update:data', data: IEvent): void}>()
const data = ref<IEvent>(props.data)
const tabDataView = ref('main')

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:data', data.value)
})

// METODOS ---------------------------------------------------
// const methods = {}
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
