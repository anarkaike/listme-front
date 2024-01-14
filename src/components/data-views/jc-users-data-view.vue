<template>
  <div class="ctn-jc-users-data-view row">
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none">
      <q-list bordered >
        <q-item class="q-pa-none">
          <q-item-section>
            <q-img :src="user.url_photo" fit="contain" style="max-height: 200px;" />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item :style="{color:(user.status?'green':'gray')}">
          <q-item-section avatar><q-icon :name="user.status?'toggle_on':'toggle_off'" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Status em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{user.status?'Ativo':'Inativo'}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section avatar><q-icon name="post_add" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{user.created_at}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section avatar><q-icon name="save_as" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{user.updated_at}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">
      <q-list>
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{user.name}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Email:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{user.email}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Celular:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{user.phone}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'
import type { IUser } from '@/interfaces'

// CONSTANTES ---------------------------------------------------
const props = withDefaults(defineProps<{
  user: IUser
}>(), {})
const user = ref<IUser>(props.user)
const emit = defineEmits<{(e: 'update:user', user: IUser): void}>()

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:user', user.value)
})

// METODOS ---------------------------------------------------
// const methods = {}
</script>

<style lang="scss" scoped>
.ctn-jc-users-data-view {

}
</style>
