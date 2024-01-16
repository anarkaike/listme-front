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
            <q-item-label class="text-body2 text-weight-medium">{{row.name}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO EMAIL -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="iconamoon:email-thin" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Email:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.email}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO CELULAR -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="et:phone" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Celular:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.phone}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO Perfis -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="carbon:ibm-cloud-app-id" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Perfis atribuídos a este usuário:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              <q-chip outline dense v-for="profile in row.profiles" :key="profile.id">{{profile.name}}</q-chip>
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
          <q-item-section v-if="row.url_photo && row.url_photo!=='' && typeof row.url_photo==='string'">
            <q-img :src="row.url_photo" fit="contain" style="max-height: 200px;" />
          </q-item-section>
          <q-item-section v-else class="text-body text-grey-6 text-center">
            <q-item-label>Nenhuma <strong>foto</strong> cadastrada ainda</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO STATUS -->
        <q-item :style="{color:(row.status?'green':'gray')}">
          <q-item-section avatar><q-icon :name="row.status?'toggle_on':'toggle_off'" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Status:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{toEUserStatusLabels[row.status]}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - CRIADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="ph:calendar-plus-light" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(row.created_at)}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - ATUALIZADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="material-symbols-light:edit-calendar-outline" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(row.updated_at)}}</q-item-label>
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
const props = withDefaults(defineProps<{ row: IUser }>(), {})
const emit = defineEmits<{(e: 'update:row', row: IUser): void}>()
const row = ref<IUser>(props.row)

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:row', row.value)
})

// METODOS ---------------------------------------------------
// const methods = {}
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
