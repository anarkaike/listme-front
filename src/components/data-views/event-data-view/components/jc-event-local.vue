<template>
  <div class="text-h6">Informações de Local</div>
  <q-list>

    <!-- INFO ENDEREÇO -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="icon-park-outline:road-sign" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Endereço:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{props.row.address}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <div class="row">

      <!-- INFO CIDADE -->
      <div class="col-12 col-sm-6">
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="solar:city-outline" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Cidade:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{props.row.city}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

      <!-- INFO ESTADO -->
      <div class="col-12 col-sm-6">
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="arcticons:50-us-states-map" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Estado:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{props.row.state}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

    </div>

    <!-- INFO CONTATOS -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="mdi:cellphone-information" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Informações de contato:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{props.row.contact_info}}</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'

const props = withDefaults(defineProps<{ row: IEvent }>(), {})
</script>
