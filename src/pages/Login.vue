<template>
  <q-page style="min-height: auto;">
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class=" text-h5 text-center text-bold page-title">Acesse o Sistema </p>
      <div class="col-11 q-gutter-y-sm">
        <q-input
          label="Email"
          v-model="form.email"
          filled
          autofocus
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
          label="Senha"
          v-model="form.password"
          filled
          lazy-rules
          :rules="[
            (val) => (val.length !== 0) || 'Digite sua senha',
            (val) => (val.length >= 6) || 'Digite pelo menos 6 caracter!'
          ]"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="full-width">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            primary
            unelevated
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Criar nova conta"
            color="secondary"
            class="full-width"
            flat
            icon="add"
            to="/register"
            size="md"
            @click="handlerOpenRegister"
          />
          <q-btn
            label="Recuperar minha senha"
            color="secondary"
            class="full-width"
            icon="lock_reset"
            flat
            :to="{ name: 'forgot-password'}"
            size="md"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
// import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
// import apiAuth from 'src/composables/api/ApiAuth'
// import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    // const router = useRouter()
    const { isFullscreen, enter } = useFullscreen()
    // const { isLoggedIn } = useAuthUser()
    // const { login, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    // const { listAll } = apiAuth()

    const form = ref({
      email: 'anarkaike@gmail.com',
      password: '123456'
    })

    onMounted(() => {
      console.log('process.env. ', process.env)
      // if (isLoggedIn) {
      // router.push({ name: 'me' })
      // }
    })

    const handlerOpenRegister = () => {
      if (!isFullscreen.value) {
        enter()
      }
    }

    const handleLogin = async () => {
      try {
        // await login(form.value)
        // router.push('/me')
        // listAll().then((data) => {
        //   console.log('Junio listAll', data)
        // })
        notifySuccess('Login successfully!')
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleLogin,
      handlerOpenRegister
    }
  }
})
</script>
