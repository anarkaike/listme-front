<template>
  <div style="min-height: auto !important;">

    <!-- FORMULÁRIO DE AUTO REGISTRO -->
    <q-form ref="myForm" class="row justify-center" @submit.prevent="methods.autoRegister">

      <!-- TITULO DA PAGINA -->
      <p class="col-12 text-h5 text-bold text-center box-title">Criar nova conta</p>
        <q-stepper
          v-model="step"
          vertical
          animated
          class="full-width"
          size="sm"
          flat
          done-color="positive"
          active-color="accent"
        >

          <!-- PASSO 1 - DADOS DE IDENTIFICACAO -->
          <q-step
            :name="1"
            title="Dados para identificação"
            icon="person"
            :done="step > 1"
          >

            <!-- CAMPO NOME DO CONTATO -->
            <q-input
              label="Seu nome"
              v-model="form.contact_name"
              filled
              lazy-rules
              dense
              autofocus
              class="q-pb-sm"
              :rules="[val => (val && val.length > 0) || 'Digite seu nome']"
            >
              <template #prepend>
                <q-icon name="badge" />
              </template>
            </q-input>

            <!-- CAMPO NOME DA EMPRESA -->
            <q-input
              label="Nome da empresa"
              v-model="form.company_name"
              filled
              lazy-rules
              dense
              class="q-pb-sm"
              :rules="[val => (val && val.length > 0) || 'Digite o nome da empresa']"
            >
              <template #prepend>
                <q-icon name="business" />
              </template>
            </q-input>

            <!-- CAMPO RAMO DE ATIVIDADE / BUSINESS SECTOR -->
            <q-select
              label="Ramo de atividade"
              v-model="form.business_sector"
              filled
              dense
              class="q-pb-sm"
              lazy-rules
              emit-value
              map-options
              option-value="id"
              option-label="label"
              :options="optionsBusinessSector()"
              :rules="[val => (val && val.length > 0) || 'Escolha o setor de negócio']">
              <template #prepend>
                <q-icon name="category" />
              </template>
            </q-select>

            <!-- BOTÃO CONTINUAR -->
            <q-stepper-navigation class="q-pt-sm">
              <q-btn @click="methods.nextStep" color="primary" label="Continuar" class="float-right" unelevated />
            </q-stepper-navigation>
          </q-step>

          <!-- PASSO 2 - DADOS DE CONTATO -->
          <q-step
            :name="2"
            title="Dados de contato"
            icon="phone_iphone"
            :done="step > 2"
          >

            <!-- CAMPO EMAIL -->
            <q-input
              label="Email"
              v-model="form.email"
              filled
              dense
              class="q-pb-sm"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Digite seu email',
                val => (/^[A-Za-z0-9+_.-]+@([A-Za-z0-9+_-])+\.([A-Za-z0-9+_-])+$/.test(val)) || 'Email digitado é inválido!'
              ]"
              type="email"
            >
              <template #prepend>
                <q-icon name="alternate_email" />
              </template>
            </q-input>

            <!-- CAMPO CELULAR -->
            <q-input
              label="Celular"
              v-model="form.phone"
              filled
              dense
              class="q-pb-sm"
              lazy-rules
              mask="(##) ##### - ####"
              :rules="[val => (val && val.length > 0) || 'Digite seu telefone']"
              type="text"
            >
              <template #prepend>
                <q-icon name="smartphone" />
              </template>
            </q-input>

            <!-- BOTÕES VOLTAR E CONTINUAR -->
            <q-stepper-navigation class="q-pt-sm d-flex">
              <q-btn flat @click="methods.prevStep" color="secondary" label="Voltar" />
              <q-btn @click="methods.nextStep" color="primary" label="Continuar" class="float-right" unelevated />
            </q-stepper-navigation>
          </q-step>

          <!-- PASSO 3 - SENHAS DE ACESSO -->
          <q-step
            :name="3"
            title="Senha de acesso"
            icon="lock"
            :done="step > 3"
          >
            <!-- CAMPO SENHA -->
            <q-input
              label="Senha"
              v-model="form.password"
              filled
              dense
              class="q-pb-sm"
              lazy-rules
              :type="pwsVisible?'text':'password'"
              :rules="[
                (val) => (val.length !== 0) || 'Digite uma senha',
                (val) => (val.length >= 6) || 'A senha deve conter pelo menos 6 caracteres'
              ]"
            >
              <template #prepend>
                <q-icon name="lock" />
              </template>
              <template #append>
                <q-icon
                  :name="pwsVisible ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="pwsVisible = !pwsVisible"
                />
              </template>
            </q-input>

            <!-- CAMPO REPITA A SENHA -->
            <q-input
              label="Repita a senha"
              v-model="form.password2"
              filled
              dense
              class="q-pb-sm"
              lazy-rules
              :type="pwsVisible?'text':'password'"
              :rules="[
                (val) => (val.length !== 0) || 'Digite novamente a senha',
                (val) => (val.length >= 6) || 'A senha deve conter pelo menos 6 caracteres',
                (val) => (val === form.password) || 'As senhas digitadas devem ser iguais'
              ]"
            >
              <template #prepend>
                <q-icon name="lock_reset" />
              </template>
              <template #append>
                <q-icon
                  :name="pwsVisible ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="pwsVisible = !pwsVisible"
                />
              </template>
            </q-input>

            <!-- BOTÕES VOLTAR E CADASTRAR -->
            <q-stepper-navigation class="q-pt-sm">
              <q-btn flat @click="methods.prevStep" color="secondary" label="Voltar" />
              <q-btn type="submit" color="primary" label="Cadastrar" class="float-right" unelevated />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { QForm } from 'quasar'
import { $vibrate, $notify } from '@/composables'
import { $stores } from '@/stores/all'
import { ESaasClientBusinessSectorValues, ESaasClientBusinessSectorLabels } from '@/enums'

// CONSTANTES ---------------------------------------------
const router = useRouter()
const pwsVisible = ref(false)
const step = ref(1)
const myForm = ref<QForm|null>(null)
const form = ref({
  company_name: '',
  contact_name: '',
  email: '',
  password: '',
  business_sector: '',
  phone: '',
  password2: ''
})
const optionsBusinessSector = () => {
  return [
    { id: ESaasClientBusinessSectorValues.bar, label: ESaasClientBusinessSectorLabels.bar },
    { id: ESaasClientBusinessSectorValues.boate, label: ESaasClientBusinessSectorLabels.boate },
    { id: ESaasClientBusinessSectorValues.produtor_de_festas, label: ESaasClientBusinessSectorLabels.produtor_de_festas },
    { id: ESaasClientBusinessSectorValues.cerimonialista, label: ESaasClientBusinessSectorLabels.cerimonialista }
  ]
}

// METODOS -------------------------------------------------------
const methods = {
  nextStep () {
    if (myForm.value === null) return
    myForm.value.validate().then((success: boolean) => {
      if (success) {
        step.value++
        $vibrate.action()
      } else {
        $notify.error('Complete os campos antes de continuar.')
      }
    })
  },
  prevStep () {
    step.value--
    $vibrate.action()
  },
  autoRegister () {
    $stores.auth.autoRegister(form.value, router)
  }
}

</script>
<style scoped lang="scss">
.page-title {
  margin-bottom: 0px;
}
.q-stepper {
  background-color: rgba(255,255,255,0);
  width: calc(100% + 32px) !important;
  margin-left: -16px !important;
  margin-right: -16px !important;
  padding-top: 0px;
}
</style>
