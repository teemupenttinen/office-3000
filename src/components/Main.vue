<template>
  <v-container fluid>
    <weather-widget></weather-widget>
    <div id="spacer"></div>
    <controller></controller>
  </v-container>
</template>

<script>
import WeatherWidget from '@/components/WeatherWidget.vue'
import Controller from '@/components/Controller.vue'

export default {
  data() {
    return {};
  },
  components:{
    WeatherWidget,
    Controller
  }
};
</script>

<style>
#spacer{
  height:5vw;
}
/* .flex {
  border: 1px solid red;
} */
</style>
