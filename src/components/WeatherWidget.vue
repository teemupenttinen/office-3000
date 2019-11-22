<template>
  <v-layout row wrap class="white--text">

    <v-flex md3 hidden-sm-and-down>
    </v-flex>
    <v-flex xs12 sm12 md6>

      <v-layout row wrap class="white--text">
        <v-flex xs6>
          <v-layout row wrap class="text-xs-right">
            <!-- TIME -->
            <v-flex xs12>
              <p class="font-weight-bold" id="time">{{time}}</p>
            </v-flex>

            <!-- DAY -->
            <v-flex xs12>
              <p id="day" class="font-weight-bold">{{getDay}}</p>
            </v-flex>

            <!-- DATE -->
            <v-flex xs12>
              <p id="date">{{getDate}}</p>
            </v-flex>

          </v-layout>
        </v-flex>

        <!-- VERTICAL LINE -->
        <v-flex xs1>
          <div id="vl"></div>
        </v-flex>
        <v-flex xs5>
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-left">
              <i id="weatherIcon" :class="getWeatherIcon"></i>
            </v-flex>
            <v-flex xs12 class="text-xs-left">
              <p id="temp">{{temp}}</p>
            </v-flex>
          </v-layout>
        </v-flex>

      </v-layout>

    </v-flex>
    <v-flex md3 hidden-sm-and-down>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      time: "00:00",
      days: [
        "maanantai",
        "tiistai",
        "keskiviikko",
        "torstai",
        "perjantai",
        "lauantai",
        "sunnuntai"
      ],
      months: [
        "tammikuuta",
        "helmikuuta",
        "maaliskuuta",
        "huhtikuuta",
        "toukokuuta",
        "kesäkuuta",
        "heinäkuuta",
        "elokuuta",
        "syyskuuta",
        "lokakuuta",
        "marraskuuta",
        "joulukuuta"
      ],
      temp: "0°",
      iconId: null
    };
  },
  mounted() {
    let self = this;
    this.time = moment().format("HH:mm");
    let weatherFunc = ()=>{
      axios
      .get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: "Espoo,fi",
          APPID: "a0cf72411f1982712f19b222bfd31f4c",
          units: "metric"
        }
      })
      .then(function(response) {
        self.temp = response.data.main.temp + "°";
        self.iconId = response.data.weather[0].id;
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    weatherFunc();
    // Interval to update the weather
    setInterval(() => {
      self.time = moment().format("HH:mm");
      weatherFunc();
    }, 20000);
  },
  computed: {
    getWeatherIcon() {
      if (this.iconId !== null) {
        let prefix = "wi wi-";
        let dayOrNight = "";
        let hour = parseInt(moment().format("HH"));

        if (hour > 6 && hour < 20) {
          dayOrNight = "day-";
        } else {
          dayOrNight = "night-";
        }
        return prefix + "owm-" + dayOrNight + this.iconId;
      }
    },
    getDay() {
      if (moment !== undefined) {
        return this.days[moment().subtract("d", 1).weekday()];
      } else {
        return "";
      }
    },
    getDate() {
      if (moment !== undefined) {
        return moment().date() + ". " + this.months[moment().month()];
      } else {
        return "";
      }
    }
  },
  name: "WeatherWidget"
};
</script>

<style>
p {
  margin: 0 0;
  line-height: 1;
}
#temp {
  font-size: 6vw;
}

#day {
  font-size: 4vw;
  margin-bottom: 0.5vw;
}
#date {
  font-size: 3vw;
}

#time {
  font-size: 9vw;
}
#weatherIcon {
  margin-bottom: 2vw;
  font-size: 8vw;
}

#vl {
  margin: 0 auto;
  height: 100%;
  width: 3px;
  background-color: white;
}

/* .flex {
  border: 1px solid red;
  min-height: 50px;
} */
</style>
