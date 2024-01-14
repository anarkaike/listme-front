<template>
  <q-page style="min-height: auto !important;">
    <q-form ref="myForm" class="row justify-center" @submit.prevent="handleRegister">
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
          <q-step
            :name="1"
            title="Dados para identificação"
            icon="person"
            :done="step > 1"
          >

            <q-input
              label="Seu nome"
              v-model="form.name"
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

            <q-input
              label="Nome da empresa"
              v-model="form.contact_name"
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
            <q-select
              label="Ramo de atividade"
              v-model="form.business_sector"
              filled
              dense
              class="q-pb-sm"
              lazy-rules
              :options="['Boate', 'Bar', 'Produtor de Festas', 'Cerimonialista', 'Outro']"
              :rules="[val => (val && val.length > 0) || 'Escolha o setor de negócio']">
              <template #prepend>
                <q-icon name="category" />
              </template>
            </q-select>
            <q-stepper-navigation class="q-pt-sm">
              <q-btn @click="nextStep" color="primary" label="Continuar" class="float-right" unelevated />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Dados de contato"
            icon="phone_iphone"
            :done="step > 2"
          >

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

            <q-stepper-navigation class="q-pt-sm d-flex">
              <q-btn flat @click="prevStep" color="secondary" label="Voltar" />
              <q-btn @click="nextStep" color="primary" label="Continuar" class="float-right" unelevated />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Senha de acesso"
            icon="lock"
            :done="step > 3"
          >

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

            <q-stepper-navigation class="q-pt-sm">
              <q-btn flat @click="prevStep" color="secondary" label="Voltar" />
              <q-btn type="submit" color="primary" label="Cadastrar" class="float-right" unelevated />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>

        <div class="full-width q-mb-lg" style="display:none;">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            unelevated
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Voltar para o login"
            color="secondary"
            class="full-width"
            flat
            icon="undo"
            size="md"
            :to="{ name: 'login' }"
          />
        </div>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useNotify from 'src/composables/useNotify'
import useVibratePhone from '../composables/useVibratePhone'
import useLoading from '@/composables/useLoading'
import { QForm } from 'quasar'
// import { authStore } from '@/stores/auth-store'

const { showLoading } = useLoading()
const pwsVisible = ref(false)
const { notifyError, notifySuccess } = useNotify()
const { vibrateForAction, vibrateForError, vibrateForSuccess } = useVibratePhone()
const step = ref(1)
const myForm = ref<QForm|null>(null)
const form = ref({
  name: '',
  email: '',
  password: '',
  contact_name: '',
  business_sector: '',
  phone: '',
  password2: ''
})
const nextStep = () => {
  if (myForm.value === null) return
  myForm.value.validate().then((success: boolean) => {
    if (success) {
      step.value++
      vibrateForAction()
    } else {
      notifyError('Complete os campos antes de continuar.')
    }
  })
}
const prevStep = () => {
  step.value--
  vibrateForAction()
}
const handleRegister = async () => {
  try {
    showLoading()
    // authStore().autoRegister(form.value).then(() => {
    //   hideLoading()
    //   // router.push({ name: 'me' })
    // })

    // notifySuccess()
    vibrateForSuccess()
    // router.push({
    //   name: 'email-confirmation',
    //   query: { email: form.value.email }
    // })
  } catch (error) {
    vibrateForError()
    // notifyError(error.message)
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
