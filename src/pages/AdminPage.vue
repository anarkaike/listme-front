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
<!--        <q-tab  name="home" label="Dashboard" @click="router.push({ name: 'admin', query: { tab: 'main' } })" />-->
        <q-tab name="admins" label="Admins" @click="router.push({ name: 'admin', query: { tab: 'admins' } })" />
        <q-tab name="profiles" label="Perfis" @click="router.push({ name: 'admin', query: { tab: 'profiles' } })" />
        <q-tab name="saasClients" label="Clientes Saas" @click="router.push({ name: 'admin', query: { tab: 'saasClients' } })" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="pageTab" animated transition-prev="jump-left" transition-next="jump-right">
<!--        <q-tab-panel name="home"><DasboardTab /></q-tab-panel>-->
        <q-tab-panel name="admins"><JcUserList :filter-profiles-options="methods.filterProfilesOptions" :filter-data="methods.filterUsers" /></q-tab-panel>
        <q-tab-panel name="profiles"><JcProfileList /></q-tab-panel>
        <q-tab-panel name="saasClients"><JcSaasClientList /></q-tab-panel>
      </q-tab-panels>
    </q-page>
  </q-layout>
</template>
<script lang="ts" setup>
import { IOption, IUser } from '@/interfaces'
import { ref } from 'vue'
import { DasboardTab } from './Admin'
import { EProfileAdminIds } from '@/enums'
import {
  JcProfileList,
  JcUserList,
  JcSaasClientList
} from '@/components'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const pageTab = ref(route.query?.tab ?? 'admins')

const methods = {
  filterUsers (users: IUser[]) {
    return users.filter((user: IUser) => {
      return user.is_super_admin ||
      (
        user.profile_ids?.includes(EProfileAdminIds.admin) ||
        user.profile_ids?.includes(EProfileAdminIds.adminSaas)
      )
    })
  },
  filterProfilesOptions (options: IOption[]) {
    return options.filter((option: IOption) => {
      return option.id === EProfileAdminIds.admin ||
        option.id === EProfileAdminIds.adminSaas
    })
  }
}
</script>
<style lang="scss" scoped>
.q-tab-panels {
  background-color: var(--bg-transparent-4);
  .q-tab-panel {
    padding: 0px;
  }
}
</style>
