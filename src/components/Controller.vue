<template>
    <v-layout row wrap class="white--text text-xs-center">
        <v-flex md3></v-flex>
        <v-flex md2>
            <v-btn outline large fab color="white" :id="getButtonState(1)" @click="setButton(1)">TP</v-btn>
        </v-flex>
        <v-flex md2>
            <v-btn outline large fab color="white" :id="getButtonState(3)" @click="setButton(3)">SN</v-btn>
        </v-flex>
        <v-flex md2>
            <v-btn outline large fab color="white" :id="getButtonState(2)" @click="setButton(2)">CG</v-btn>
        </v-flex>
        <v-flex md3></v-flex>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      activeButton: 0
    };
  },
  mounted() {},
  methods: {
    setButton(btn) {
      console.log(btn);
     // this.activeButton = btn;
      this.$store.dispatch("changeInput", btn)
    },
    getButtonState(btn) {
      if (this.$store.getters.getInput === btn) {
        return "btn-selected";
      } else {
        return "";
      }
    }
  },
  computed: {},
  name: "Controller"
};
</script>

<style scoped>
#btn-selected {
  border: solid 0.5vw rgba(6, 247, 78, 0.589) !important;
  box-shadow: 0px 0px 20px rgba(6, 247, 78, 0.589);
}

.v-btn--floating {
  font-size: 5vw !important;
  height: 15vw;
  width: 15vw;
  border: solid 0.5vw rgba(0, 0, 0, 0.377);
}
</style>
