<template>
  <q-page class="row justify-center">
    <div class="col-8 column items-center">

      <div class="text-h4">Simple Pomodoro</div>
      <div class="row full-width text-center">
        <div class="col">
          <div class="text-subtitle1">Categorias: {{tags.length}}</div>

          <div class="flex flex-center">
            <q-chip v-for="(tag, index) in tags" :key="index" clickable @click="addSelectedAndRemoveTag(tag)" color="primary" text-color="white" icon="event">
              {{ tag.name }}
            </q-chip>
          </div>
        </div>
        <div class="col">
          <div class="text-subtitle1">Seleccionadas: {{tagsSelected.length}}</div>

          <div class="flex flex-center">
            <q-chip v-for="(selected, index) in tagsSelected" :key="index" clickable @click="removeSelectedAndAddTag(selected)" color="primary" text-color="white" icon="event">
              {{ selected.name }}
            </q-chip>
          </div>
        </div>
      </div>

      <!-- <div class="text-h2 text-weight-bolder">{{ minutes }}:{{ seconds }}</div> -->

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
    </div>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn fab icon="home" to="/login" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import pomodoroMixin from './pomodoro.mixin'
export default {
  mixins: [pomodoroMixin]
}

</script>
