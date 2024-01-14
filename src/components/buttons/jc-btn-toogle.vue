<template>
  <span class="ctn-jc-btn-toogle" :style="{color: color}" @click="methods.onClick">
    <q-icon :name="icon" :color="color" :size="props.size" />
    <br>
    {{label}}
  </span>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watchEffect, withDefaults } from 'vue'

// CONSTANTES ---------------------------------------------------
const props = withDefaults(defineProps<{
  // Geral
  status: boolean|string,
  size?: string,
  // Status Ativo
  activeLabel?: string,
  activeColor?: string,
  activeIcon?: string,
  activeValue?: string | boolean,
  // Status Inativo
  inactiveLabel?: string
  inactiveColor?: string
  inactiveIcon?: string
  inactiveValue?: string | boolean
}>(), {
  // Geral
  status: false,
  size: 'lg',
  // Status Ativo
  activeLabel: 'Ativo',
  activeColor: 'green',
  activeIcon: 'toggle_off',
  activeValue: true,
  // Status Inativo
  inactiveLabel: 'Inativo',
  inactiveColor: '#CCC',
  inactiveIcon: 'toggle_on',
  inactiveValue: false
})

const status = ref(props.status)
const color = computed(() => methods.isActive() ? props.activeColor : props.inactiveColor)
const icon = computed(() => methods.isActive() ? props.activeIcon : props.inactiveIcon)
const label = computed(() => methods.isActive() ? props.activeLabel : props.inactiveLabel)

const emit = defineEmits([
  'update:status',
  'on-click'
])

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:status', status.value)
})

// METODOS ---------------------------------------------------
const methods = {
  onClick (value: unknown) {
    this.toogle()
    emit('on-click', value)
  },
  isActive (): boolean {
    return status.value === props.activeValue
  },
  toogle () {
    status.value = methods.isActive() ? props.inactiveValue : props.activeValue
  }
}
</script>

<style lang="scss" scoped>
.ctn-jc-btn-toogle {
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  .q-icon {
    margin-bottom: -10px;
  }
}
</style>
