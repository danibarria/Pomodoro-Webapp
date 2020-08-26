<template>
  <div class="wrapper q-mt-md">
    <footer class="row justify-center">
      <div class="col-10">
        <div class="text-h6">Email: {{ emailStore || 'anonimo' }}</div>
        <div class="text-subtitle1">Estadisticas</div>
        <div class="text-subtitle2">Cantidad de pomodoros: {{ pomodoros.length }}</div>
        <canvas ref="chart" id="myChart" width="400" height="400"></canvas>
      </div>
    </footer>
    <main class="row justify-center">
      <div class="col-10">

        <div class="text-subtitle1 q-mt-md">Categorías</div>
        <q-chip v-for="(tag, index) in tags" :key="index" removable @remove="onDeleteTag(tag.id)" icon="directions" :label="tag.name" />
        <span v-if="!tags.length">No hay Categorías</span>

        <div class="text-subtitle1 q-mt-sm">Nueva Categoría</div>
        <q-form
          @submit="onSubmitTag"
        >
          <div>
            <q-input v-model="tagName" type="text" label="Nombre" />
            <q-btn label="Crear Categoría" type="submit" class="full-width q-my-md" color="primary"/>
          </div>
        </q-form>
      </div>
    </main>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn fab icon="home" to="/login" color="primary" />
    </q-page-sticky>
  </div>
</template>

<script>
import userMixin from './user.mixin'
import requests from '../requests.mixin'
export default {
  mixins: [requests, userMixin]
}
</script>

<style>

</style>
