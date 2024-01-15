<template>
  <q-footer>
    <q-toolbar>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<style lang="scss" scoped>
.q-footer {
  left: 0px !important;

  $border-radius: 100%;
  -webkit-border-top-left-radius: $border-radius;
  -webkit-border-top-right-radius: $border-radius;
  -moz-border-radius-topleft: $border-radius;
  -moz-border-radius-topright: $border-radius;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;

  .q-toolbar {
    margin-top: 15px;
    margin-bottom: -5px;
  }
}
</style>
