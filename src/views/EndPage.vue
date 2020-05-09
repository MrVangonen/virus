<template>
  <div class="end">
    <span class="scores"> {{ $route.query.scores ? $route.query.scores : 0 }} {{ $route.query.scores != 1 ? 'scores' : 'score' }}</span>
    <button class="btn btn-play" @click="$router.push({name: 'choosePlayer'})">
      Reload
      <svg
        class="reload"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
    <img src="../assets/sick.png" alt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.end {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .scores {
    font-size: 3rem;
  }

  .btn-play {
    display: flex;
    align-items: center;

    .reload {
      width: 50px;
      height: 50px;
      fill: var(--accent-color);
      margin-left: 10px;
    }
  }

  .btn-play:hover {
    transform: none;

    .reload {
      animation: spin 1s linear infinite;
    }
  }
}
</style>