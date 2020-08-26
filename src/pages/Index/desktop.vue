<template>
  <q-page class="row justify-center">
    <div class="col-8 column items-center">

      <div class="text-h4 q-mt-md">Simple Pomodoro</div>
      <q-circular-progress
        show-value
        class="text-red q-ma-md"
        :value="totalTimeLeft"
        size="500px"
        color="red"
      >
          <div style='padding:0 0 10px 0; font-size:100px;'>&#127813;</div>
          <div class="full-width text-center">
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

      <q-btn class="full-width q-my-sm q-py-sm" rounded color="green" :icon="startStopIcon" :label="startStopText" @click="toggleTimer" />
      <q-btn class="full-width q-my-sm q-py-sm" rounded color="red" icon="refresh" label="Reset" @click="resetTimer" />

      <q-page-sticky position="top-right" :offset="[18, 18]">
            <q-btn fab icon="account_circle" to="/login" color="primary" />
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import timer from '../timer.mixin'
export default {
  mixins: [timer],
  name: 'PageIndex'
}
</script>
