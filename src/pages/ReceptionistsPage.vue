<template>
  <div>
    <h1 class="page-title">
      Recepcionistas
    </h1>
    <div>
      <JcUserList :filter-profiles-options="methods.filterProfilesOptions" :filter-data="methods.filterUsers" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IOption, IUser } from '@/interfaces'
import {
  JcUserList
} from '@/components'

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
      return option.id.toString() === '6'
    })
  }
}
</script>
