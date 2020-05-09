<template>
  <div>
    <canvas id="gameCanvas" style="cursor: none;" width="100" height="600">Not working</canvas>
  </div>
</template>

<script>
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
  mounted() {
    let playerId = this.$route.query.id || 0;
    let playerObj = this.players.find(item => {
      return item.id == playerId;
    });

    let isMusicAllowed = Boolean(
      Number(localStorage.getItem("isMusicAllowed") ? localStorage.getItem("isMusicAllowed") : 0)
    );

    this.script(this, playerObj, isMusicAllowed);
  },
  methods: {
    script(pageContext, playerObj, isMusicAllowed) {
      let scoresText = document.getElementById("scores");
      let startBtn = document.getElementById("startBtn");
      let canvas = document.getElementById("gameCanvas");
      let context = canvas.getContext("2d");

      context.canvas.width = window.innerWidth; // set canvas w and h
      context.canvas.height = window.innerHeight;
      var myReq;
      let timer = 0;
      let scores = 0;
      let virusWidth = 492 * 0.1;
      let virusHeight = 520 * 0.1;
      let fireWidth = 800 * 0.02;
      let fireHeight = 1800 * 0.02;
      let viruses = [];
      let fires = [];
      let bustes = [];
      let player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 662 * 0.1,
        height: 1014 * 0.1,
        health: playerObj.health
      };

      var burstAudio = new Audio();
      var owwAudio = new Audio();

      if (isMusicAllowed) {
        burstAudio.src = require("../audio/burst.wav");
        owwAudio.src = require("../audio/oww.wav");
      }

      var backImg = new Image();
      backImg.src = require("../assets/world.svg");

      var playerImg = new Image();
      playerImg.src = playerObj.img;

      var virusImg = new Image();
      virusImg.src = require("../assets/virus.png");

      var virusDefuseImg = new Image();
      virusDefuseImg.src = require("../assets/defuse-virus.png");

      var fireImg = new Image();
      fireImg.src = playerObj.bullet;

      var splashImg = new Image();
      splashImg.src = require("../assets/bust.png");

      canvas.addEventListener("mousemove", event => {
        player.x = event.offsetX - 25;
        player.y = event.offsetY - 13;
      });

      backImg.onload = function() {
        gamePlay();
      };

      function gamePlay() {
        update();
        render();
        myReq = requestAnimationFrame(gamePlay); // browser rerender

        if (player.health < 0) {
          window.cancelAnimationFrame(myReq);
          goToEnd();
        }
      }

      function update() {
        timer++;

        // новый вирус
        if (timer % 10 == 0) {
          viruses.push({
            x: Math.random() * canvas.width,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 1,
            isHurtPlayer: false,
            deleted: false
          });
        }

        // новый выстрел
        if (timer % 30 == 0) {
          fires.push({
            x: player.x + 10,
            y: player.y,
            dx: 0,
            dy: -5.2
          });
        }

        // animate bustes
        bustes.forEach((bust, bustIndex) => {
          bust.animx = bust.animx + 0.5;

          if (bust.animx > 7) {
            bust.animy++;
            bust.animx = 0;
          }

          if (bust.animy > 7) {
            bustes.splice(bustIndex, 1);
          }
        });

        viruses.forEach((virus, index) => {
          // физика
          virus.x += virus.dx;
          virus.y += virus.dy;

          // границы
          if (virus.x >= canvas.width - virusWidth || virus.x < 0) {
            virus.dx = -virus.dx;
          }

          if (virus.y >= canvas.height) {
            viruses.splice(index, 1);
          }

          //check fire and virus
          fires.every((fire, fireIndex) => {
            if (
              Math.abs(
                virus.x + virusWidth * 0.5 - (fire.x + fireWidth * 0.5)
              ) < virusWidth &&
              Math.abs(virus.y - fire.y) < virusHeight * 0.5
            ) {
              bustes.push({
                x: virus.x - virusWidth * 0.5,
                y: virus.y - virusHeight * 0.5,
                animx: 0,
                animy: 0
              });

              virus.deleted = true;
              fires.splice(fireIndex, 1);
              ++scores;
              burstAudio.play();
              return false;
            } else {
              return true;
            }
          });

          //check player and virus
          if (
            !virus.isHurtPlayer &&
            Math.abs(
              virus.x + virusWidth * 0.5 - (player.x + player.width * 0.5)
            ) < virusWidth &&
            Math.abs(virus.y - player.y) < player.height * 0.5
          ) {
            playerImg.width = 5;
            virus.dx = -virus.dx;
            virus.yx = -virus.yx;
            virus.isHurtPlayer = true;
            player.health -= 5;

            owwAudio.play();
          }

          if (virus.deleted) {
            viruses.splice(index, 1);
          }
        });

        fires.forEach((fire, index) => {
          // физика
          fire.x += fire.dx;
          fire.y += fire.dy;

          // границы
          if (fire.y < -30) {
            fires.splice(index, 1);
          }
        });
      }

      function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(backImg, 0, 0, canvas.width - 20, canvas.width - 20);
        context.drawImage(
          playerImg,
          player.x,
          player.y,
          player.width,
          player.height
        );
        context.font = "48px KulminoituvaRegular";
        context.textBaseline = "hanging";
        context.strokeText(scores, 0, 20);
        context.strokeText(player.health, canvas.width - 90, 20);

        viruses.forEach(virus => {
          if (virus.isHurtPlayer) {
            context.drawImage(
              virusDefuseImg,
              virus.x,
              virus.y,
              virusWidth,
              virusHeight
            );
          } else {
            context.drawImage(
              virusImg,
              virus.x,
              virus.y,
              virusWidth,
              virusHeight
            );
          }
        });

        fires.forEach(fire => {
          context.drawImage(fireImg, fire.x, fire.y, fireWidth, fireHeight);
        });

        bustes.forEach(bust => {
          context.drawImage(
            splashImg,
            200 * Math.floor(bust.animx),
            200 * Math.floor(bust.animy),
            200,
            200,
            bust.x,
            bust.y,
            virusWidth,
            virusHeight
          );
        });
      }

      function goToEnd() {
        pageContext.$router.push({ name: "end", query: { scores: scores } });
      }
    }
  }
};
</script>

<style>
</style>