<template>
  <q-layout view="lHh Lpr lFf">
    <div class="page-title">
      Usuários
    </div>
    <q-page>
      <JcUserList :filter-profiles-options="methods.filterProfilesOptions" :filter-data="methods.filterUsers" />
    </q-page>
  </q-layout>
</template>
<script lang="ts" setup>
import { IOption, IUser } from '@/interfaces'
import { EProfileAdminIds } from '@/enums'
import { JcUserList } from '@/components'

const methods = {
  filterUsers (users: IUser[]) {
    return users.filter((user: IUser) => {
      return !user.is_super_admin &&
      (
        !user.profile_ids?.includes(EProfileAdminIds.admin) &&
        !user.profile_ids?.includes(EProfileAdminIds.adminSaas)
      )
    })
  },
  filterProfilesOptions (options: IOption[]) {
    return options.filter((option: IOption) => {
      return option.id !== EProfileAdminIds.admin &&
        option.id !== EProfileAdminIds.adminSaas
    })
  }
}
</script>
