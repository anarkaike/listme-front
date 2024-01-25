<template>
  <div style="min-height: auto !important;">
    <q-form class="row justify-center">
      <p class="col-12 text-h5 text-bold text-center page-title">Recuperar minha senha</p>
      <div class="col-11 q-gutter-y-md">

        <q-input
          label="Email"
          v-model="email"
          filled
          class="q-pb-sm"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Digite seu email']"
          type="email"
        >
          <template #prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>

        <div class="full-width">
          <q-btn
            label="Recuperar senha"
            color="primary"
            class="full-width"
            primary
            unelevated
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Voltar para o login"
            color="secondary"
            class="full-width"
            icon="undo"
            flat
            :to="{ name: 'login'}"
            size="md"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>
