<template>
  <div view="lHh Lpr lFf">
    <div class="page-title">
      Dashboard
    </div>
    <q-page>
      <div class="row ctn-box-links">
        <div class="col-6 col-md-4 col-lg-4 q-pa-xs-none">
          <q-card class="q-ma-sm" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-eventos.png">
              <div class="absolute-bottom text-subtitle1 text-center q-pa-xs q-ma-xs label-button-home-page">
                Eventos
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 col-md-4 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-sm" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-listas.png">
              <div class="absolute-bottom text-subtitle1 text-center q-ma-xs label-button-home-page">
                Listas
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 col-md-4 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-sm" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-convidados.png">
              <div class="absolute-bottom text-subtitle1 text-center q-ma-xs label-button-home-page">
                Nomes
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 col-md-4 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-sm" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-recepcionistas.png">
              <div class="absolute-bottom text-subtitle1 text-center q-ma-xs label-button-home-page">
                Recepcionistas
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 col-md-4 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-sm" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-promoters.png">
              <div class="absolute-bottom text-subtitle1 text-center q-ma-xs label-button-home-page">
                Promoters
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 col-md-4 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-sm" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-usuarios.png">
              <div class="absolute-bottom text-subtitle1 text-center q-ma-xs label-button-home-page">
                Usuários
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </q-page>
    <!-- DIALOG EVENT VIEW -->
    <JcDialog v-model:openDialog="openDialog" v-if="data && openDialog">
      <template #title>Data View Event</template>
      <JcEventDataView v-model:data="data"/>
    </JcDialog>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
// import { $stores } from '@/stores/all'
import { IEvent } from '@/interfaces'
import { JcDialog, JcEventDataView } from '@/components'

const openDialog = ref(false)
const data = ref<IEvent|null>(null)

onBeforeMount(() => {
  // $stores.events.getById(1).then((res) => {
  //   data.value = res as IEvent
  // })
})

</script>

<style lang="scss" scoped>
.label-button-home-page {
  font-size: 12px;
  padding: 5px;

}

// mobile
@media (max-width: 1024px) {
  .ctn-box-links {
    margin-left: -15px;
    margin-right: -15px;
  }
}

//desktop
@media (min-width: 1024px) {
  .label-button-home-page {
    font-size: 20px !important;
    padding: 5px;
  }
}
</style>
