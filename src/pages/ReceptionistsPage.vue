<template>
  <q-layout view="lHh Lpr lFf">
    <div class="page-title">
      Recepcionistas
    </div>
    <q-page>
      <JcUserList :filter-profiles-options="methods.filterProfilesOptions" :filter-data="methods.filterUsers" />
    </q-page>
  </q-layout>
</template>
<script lang="ts" setup>
import { IOption, IUser } from '@/interfaces'
import {
  JcUserList
} from '@/components'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const methods = {
  filterUsers (users: IUser[]) {
    return users.filter((user: IUser) => {
      return !user.is_super_admin &&
      (
        user.profile_ids?.includes(6)
      )
    })
  },
  filterProfilesOptions (options: IOption[]) {
    return options.filter((option: IOption) => {
      return option.id === '6'
    })
  }
}
</script>
