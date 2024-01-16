<template>
  <div view="lHh Lpr lFf">
    <div class="page-title">
      Dashboard
    </div>
    <q-page>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 q-pa-xs-none">
          <q-card class="q-ma-md-md q-mt-md" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-eventos.png">
              <div class="absolute-bottom text-h6 text-center">
                Eventos
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-md-md q-mt-md" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-listas.png">
              <div class="absolute-bottom text-h6 text-center">
                Listas de Nomes
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-md-md q-mt-md" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-convidados.png">
              <div class="absolute-bottom text-h6 text-center">
                Nomes de Convidados
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-md-md q-mt-md" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-recepcionistas.png">
              <div class="absolute-bottom text-h6 text-center">
                Recepcionistas
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-md-md q-mt-md" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-promoters.png">
              <div class="absolute-bottom text-h6 text-center">
                Recepcionistas
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-xs-none">
           <q-card class="q-ma-md-md q-mt-md" style="cursor: pointer;" @click="router.push({ name: 'admin' })">
            <q-img src="~assets/img-usuarios.png">
              <div class="absolute-bottom text-h6 text-center">
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
