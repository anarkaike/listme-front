<template>
  <div class="ctn-jc-data-view row reverse jc-data-view">
    <!-- COLUNA DE INFOS -->
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">
      <q-list>
        <!-- INFO NOME -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="ph:user-thin" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{data.name}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO EMAIL -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="iconamoon:email-thin" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Email:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{data.email}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO CELULAR -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="et:phone" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Celular:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{data.phone}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO Perfis -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="carbon:ibm-cloud-app-id" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Perfis atribuídos a este usuário:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              <q-chip outline dense v-for="profile in data.profiles" :key="profile.id">{{profile.name}}</q-chip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- COLUNA DE FOTO, STATUS E AUDITORIA -->
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none">
      <q-list bordered >
        <!-- INFO FOTO -->
        <q-item class="q-pa-none">
          <q-item-section v-if="data.url_photo && data.url_photo!=='' && typeof data.url_photo==='string'">
            <q-img :src="data.url_photo" fit="contain" style="max-height: 200px;" />
          </q-item-section>
          <q-item-section v-else class="text-body text-grey-6 text-center">
            <q-item-label>Nenhuma <strong>foto</strong> cadastrada ainda</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO STATUS -->
        <q-item :style="{color:(data.status?'green':'gray')}">
          <q-item-section avatar><q-icon :name="data.status?'toggle_on':'toggle_off'" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Status:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{toEUserStatusLabels[data.status]}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - CRIADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="ph:calendar-plus-light" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(data.created_at)}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - ATUALIZADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="material-symbols-light:edit-calendar-outline" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(data.updated_at)}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'
import type { IUser } from '@/interfaces'
import { EUserStatusLabels } from '@/enums'
import { useHumanize } from '@/composables'

// CONSTANTES ---------------------------------------------------
const { humanizeDatetime } = useHumanize()
const toEUserStatusLabels = EUserStatusLabels
const props = withDefaults(defineProps<{ data: IUser }>(), {})
const emit = defineEmits<{(e: 'update:data', data: IUser): void}>()
const data = ref<IUser>(props.data)

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
