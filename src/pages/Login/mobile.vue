<template>
  <div class="wrapper q-my-lg">
    <main v-show="!profileHashStore" class="row justify-center">
      <div class="col-10">
        <div class="text-h4">Ingresa tu correo electrónico</div>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <div>
            <q-input v-model="email" type="email" label="Correo electrónico" class="q-my-md" />
            <q-btn label="Conseguir mi link" type="submit" color="primary" class="full-width"/>
            <q-btn label="Volver al pomodoro" to="/" color="primary" outline class="full-width q-my-md"/>
          </div>
        </q-form>
      </div>
    </main>
    <footer v-show="profileHashStore" class="row justify-center q-my-md">
      <div class="col-10 q-mt-xl">
        <div class="text-h4 text-center q-mb-lg">Aca estan tus links</div>
        <q-btn color="primary" class="full-width q-my-md" label="Perfil" :to="`/users/${profileHashStore}`" />
        <q-btn color="primary" class="full-width q-my-md" label="Pomodoro" :to="`/pomodoro/${profileHashStore}`" />
      </div>
    </footer>

    <q-page-sticky v-show="profileHashStore" position="top-right" :offset="[18, 18]">
      <q-btn fab icon="exit_to_app" @click="logout" color="red" />
    </q-page-sticky>
  </div>
</template>

<script>
import loginMixin from './login.mixin'
export default {
  mixins: [loginMixin]
}
</script>

<style>

</style>
