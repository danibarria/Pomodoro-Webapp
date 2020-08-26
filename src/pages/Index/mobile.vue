<template>
    <div class="fullheight row justify-center items-end">
      <div class="col-10">
        <h1 class="text-h5 text-center q-mt-md">Simple Pomodoro</h1>
        <main class="q-mb-md">
          <q-circular-progress
            show-value
            class="text-red"
            :value="totalTimeLeft"
            size="300px"
            color="red"
            >

            <div style='padding:0 0 10px 0; font-size:100px;'>&#127813;</div>
            <div class="full-width text-center" style="font-size:50px">
            {{ minutes }}:{{ seconds }}
            </div>
          </q-circular-progress>

          <q-slider
            v-model="totalTime"
            color="red"
            :step="30"
            :min="1*60"
            :max="120*60"
            :disable="!paused"
          />
        </main>
        <footer>
          <q-btn class="full-width q-my-sm q-py-sm" color="green" :icon="startStopIcon" :label="startStopText" @click="toggleTimer" />
          <q-btn class="full-width q-my-sm q-py-sm" color="red" icon="refresh" label="Reset" @click="resetTimer" />
        </footer>
      </div>
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn fab icon="account_circle" to="/login" color="primary" />
      </q-page-sticky>
    </div>
</template>

<script>
import timer from '../timer.mixin'
export default {
  mixins: [timer]

}
</script>

<style>
.fullheight {
  min-height: 90vh;
  /* max-height: 90vh; */
}
</style>
