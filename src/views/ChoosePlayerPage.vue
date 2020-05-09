<template>
  <div class="container">
    <div>
      <PlayerCard
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        @one-click="changePlayer(player)"
        @double-click="changePlayer(player); startGame(player);"
      />
    </div>
  </div>
</template>

<script>
import PlayerCard from "../components/PlayerCard.vue";
export default {
  data() {
    return {
      players: [
        {
          id: 0,
          img: require("../assets/doctor.png"),
          health: 100,
          respect: 5,
          bullet: require("../assets/pill.png"),
          name: "Doctor",
          text: "Самый первый персонаж. Вероятность заражения крайне высока.",
          isActive: false,
          isDisabled: false
        },
        {
          id: 1,
          img: require("../assets/businessman.png"),
          health: 200,
          respect: 50,
          bullet: require("../assets/money.png"),
          name: "Businessman",
          text: "Заливает деньгами. Шансы выжить увеличиваются.",
          isActive: true,
          isDisabled: false
        },
        {
          id: 2,
          img: require("../assets/stewardess.png"),
          health: 500,
          respect: 200,
          bullet: require("../assets/coffee.png"),
          name: "Stewardess",
          text: "Может улететь при необходимости. Осыпает вирус с облаков.",
          isActive: false,
          isDisabled: true
        },
        {
          id: 3,
          img: require("../assets/boss.gif"),
          health: 1000,
          respect: 5000,
          bullet: require("../assets/blast.png"),
          name: "Superman",
          text: "Непобедим.",
          isActive: false,
          isDisabled: true
        }
      ]
    };
  },
  components: {
    PlayerCard
  },
  methods: {
    changePlayer(player) {
      if (!player.isDisabled) {
        this.players.every(item => {
          item.isActive = false;
          return true;
        });

        player.isActive = true;
      }
    },
    startGame(player) {
      if(!player.isDisabled) {
        this.$router.push({name: 'game', query: {
          id: player.id
        }})
      }
    }
  }
};
</script>

<style>
</style>