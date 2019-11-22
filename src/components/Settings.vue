<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex sm1></v-flex>
            <v-flex xs12 sm3>
                <v-card class="elevation-12" dark>
                    <v-toolbar dark>
                        <v-toolbar-title>AV-System</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="ipAddress" prepend-icon="tv" name="ipAddress" label="IP Address" type="text"></v-text-field>
                            <v-text-field v-model="port" prepend-icon="import_export" name="port" label="Port"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="saveSettings()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex sm1></v-flex>
        </v-layout>
        <v-snackbar v-model="snackbar" :timeout="6000" top>
            Saved successfully!
            <v-btn color="pink" flat @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      ipAddress: "0.0.0.0",
      port: 1000,
      snackbar: false
    };
  },
  methods: {
    saveSettings() {
      this.$store.dispatch("saveSettings", {
        ipAddress: this.ipAddress,
        port: this.port
      });
      this.snackbar = true;
    }
  },
  mounted(){
      this.ipAddress = this.$store.getters.getIpAddress;
      this.port = this.$store.getters.getPort;
  }
};
</script>

<style>
#spacer {
  height: 5vw;
}
/* .flex {
  border: 1px solid red;
} */
</style>
