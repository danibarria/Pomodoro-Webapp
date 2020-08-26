<template>
  <div class="wrapper">
    <main class="row justify-center">
      <div class="col-10 items-center">
        <div class="text-h5 text-center">Simple Pomodoro</div>
        <!-- <div class="text-h2 text-weight-bolder">{{ minutes }}:{{ seconds }}</div> -->

        <q-circular-progress
          show-value
          class="text-red flex-center"
          :value="totalTimeLeft"
          size="300px"
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
      </div>
    </main>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn fab icon="refresh" @click="resetTimer" color="red" />
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab :icon="startStopIcon" @click="toggleTimer" color="green" />
    </q-page-sticky>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn fab icon="home" to="/login" color="primary" />
    </q-page-sticky>
  </div>
</template>

<script>
import pomodoroMixin from './pomodoro.mixin'
export default {
  mixins: [pomodoroMixin]
}

</script>
