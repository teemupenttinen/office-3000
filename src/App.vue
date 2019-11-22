<template>
  <v-app>
    <v-navigation-drawer clipped v-model="drawer" dark enable-resize-watcher absolute temporary app v-if="$store.getters.getUser !== null">
      <v-list>
        <v-list-tile  v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app class='transparent elevation-0' v-if="$store.getters.getUser !== null">
      <v-toolbar-side-icon id="menuIcon" large @click.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn icon :class="getPowerState" @click="togglePowerState()"><v-icon>power_settings_new</v-icon></v-btn>
      <v-btn icon class="white--text"><v-icon>logout</v-icon></v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "computer",
          title: "Main",
          to: "/"
        },
        {
          icon: "settings",
          title: "Settings",
          to: "Settings"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Office 3000"
    };
  },
  methods:{
    togglePowerState(){
      if(this.$store.getters.getDisplayState === 1){
        this.$store.dispatch("changeDisplayState", 0)
      }
      else{
       this.$store.dispatch("changeDisplayState", 1)
      }
      
    }
  },
  computed:{
    getPowerState(){
      if(this.$store.getters.getDisplayState === 1){
        return "white--text power-on" 
      }
      else{
        return "white--text"
      }
    }
  },
  name: "App"
};
</script>

<style>
#app {
  background-image: linear-gradient(
    rgb(17, 28, 74),
    rgb(205, 16, 63)
  ) !important;

}

.power-on{
  color: rgba(6, 247, 78, 0.589) !important;
  box-shadow: 0px 0px 20px rgba(6, 247, 78, 0.589);
}

/* .v-icon{
  font-size:3vw!important;
}
.v-list__tile__title{
  font-size:1vw!important;
  margin-left: 0.5vw;
} */
</style>
