<template>
  <div class="start">
    <button class="btn btn-play" @click="$router.push({name: 'choosePlayer'})">Play</button>
    <img class="earth" src="../assets/earthhug.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMusicAllowed: false
    };
  },
  mounted() {},
  methods: {
  }
};
</script>

<style lang="scss">
.start {
  overflow: hidden;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.earth {
  position: relative;
  animation: spin 10.5s linear infinite;
}
</style>