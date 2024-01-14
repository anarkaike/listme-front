<template>
  <q-layout view="lHh Lpr lFf">
    <div class="page-title">
      Painel Administrativo
    </div>
    <q-page>
      <q-tabs
        v-model="pageTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab  name="home" label="Dashboard" />
        <q-tab name="admins" label="Admins" />
        <q-tab name="profiles" label="Perfis" />
        <q-tab name="saasClients" label="Clientes Saas" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="pageTab" animated transition-prev="jump-left" transition-next="jump-right">
        <q-tab-panel name="home"><DasboardTab /></q-tab-panel>
        <q-tab-panel name="admins"><AdminsTab /></q-tab-panel>
        <q-tab-panel name="profiles"><ProfilesTab /></q-tab-panel>
        <q-tab-panel name="saasClients"><SaasClientsTab /></q-tab-panel>
      </q-tab-panels>
    </q-page>
  </q-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { DasboardTab, AdminsTab, ProfilesTab, SaasClientsTab } from './tabs'

const pageTab = ref('admins')
</script>
<style lang="scss" scoped>
.q-tab-panels {
  background-color: var(--bg-transparent-4);
  .q-tab-panel {
    padding: 0px;
  }
}
</style>
