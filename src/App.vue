<template>
  <div id="app">
    <Navbar v-show="showNavbar" :music.sync="music" @stopOrPlayMusic="stopOrPlayMusic()" />
    <router-view></router-view>
    <audio
      v-for="(item, key) in tracks"
      :key="key"
      :id="item.id"
      preload="auto"
      :src="item.src"
      :type="item.type"
    />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  data() {
    return {
      showNavbar: true,
      music: {
        isMusicAllowed: false,
        interval: null
      },
      tracks: [
        {
          id: "startAudio",
          src: require("./audio/intro.mp3"),
          type: "audio/mp3"
        },
        {
          id: "choosePlayerAudio",
          src: require("./audio/inspire.wav"),
          type: "audio/wav"
        },
        {
          id: "endAudio",
          src: require("./audio/crowd-cheer.wav"),
          type: "audio/wav"
        }
      ]
    };
  },
  components: {
    Navbar
  },
  created() {},
  mounted() {
    // Звук из стораджа

    // let checkIsMusicAllowed = Boolean(
    //   Number(localStorage.getItem("isMusicAllowed"))
    // );
    // if (checkIsMusicAllowed) {
    //   this.music.isMusicAllowed = false;

    //   setTimeout(() => {
    //     this.simulateEventByUser(
    //       document.getElementById("volumeButton"),
    //       "click"
    //     );
    //   }, 1000);
    // }

  },
  watch: {
    $route(to, from) {
      this.stopOrPlayMusic(to);

      if(to.name == 'game') {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    }
  },
  methods: {
    simulateEventByUser(el, etype) {
      if (el.fireEvent) {
        el.fireEvent("on" + etype);
      } else {
        var evObj = document.createEvent("Events");
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    },
    stopMusic(id) {
      clearInterval(this.music.interval);

      if (id) {
        document.getElementById(id).pause();
      } else {
        this.tracks.every(track => {
          document.getElementById(track.id).pause();
          return true;
        });
      }
    },
    playMusic(id) {
      this.music.interval = setInterval(function() {
        document.getElementById(id).play();
      }, 13);
    },
    stopOrPlayMusic(toRoute) {
      let route = toRoute ? toRoute : this.$route;
      this.stopMusic();

      if (this.music.isMusicAllowed) {
        if (route.name === "start") {
          this.playMusic("startAudio");
        } else if (route.name === "choosePlayer") {
          this.playMusic("choosePlayerAudio");
        } else if (route.name === "end") {
          this.playMusic("endAudio");
        }
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Russo One", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  overflow: hidden;
  background-color: var(--background);
  min-height: 100vh;
}

.container {
  padding: 10px;
}

.btn {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: var(--primary-color);
}

.btn-play {
  font-size: 8rem;
  transition: ease-in 3s;
  color: var(--accent-color);
}

.btn-play:focus{
  color: var(--primary-color);
}

.btn-play:hover {
  transform: scale(2);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
