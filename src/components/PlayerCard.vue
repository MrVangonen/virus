<template>
  <div
    class="card"
    @click="$emit('one-click')"
    @dblclick="$emit('double-click')"
    :class="{'is-active': player.isActive, 'is-disabled': player.isDisabled}"
  >
    <div class="left">
      <img class="clip-circle" :src="player.img" alt />
      <div class="skill">
        <span class="skill-name">Health:</span>
        <span>{{ player.health }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 0H7V7H0V17H7V24H17V17H24V7H17V0Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0"
              y1="12"
              x2="24"
              y2="12"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD3535" />
              <stop offset="1" stop-color="#BF2424" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="skill">
        <span class="skill-name">Respect:</span>
        <span>{{ player.respect }}</span>
        <svg
          class="respect"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 12.25c1.24 0 2.25-1.01 2.25-2.25S13.24 7.75 12 7.75 9.75 8.76 9.75 10s1.01 2.25 2.25 2.25zm4.5 4c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9v-.75zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
          />
        </svg>
      </div>
      <div class="skill">
        <span class="skill-name">Bullet:</span>
        <img :src="player.bullet" />
      </div>
    </div>
    <div class="middle">
      <span class="name">{{ player.name }}</span>
      <p>{{ player.text }}</p>
    </div>
    <div class="right">
      <svg
        class="is-active"
        v-show="player.isActive"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>
      <svg
        v-show="!player.isActive"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    player: Object
  }
};
</script>

<style lang="scss">
@media (max-width: 740px) {
  .card {
    flex-direction: column;

    .middle {
      text-align: left;
      width: 100%!important;
    }
  }
}

.card {
  width: 68%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 2%;
  cursor: pointer;
  margin-bottom: 30px;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;

  &.is-active {
    border-color: var(--accent-color);
    background-color: #ffebeb;
  }

  &.is-disabled {
    opacity: 0.6;
  }

  .left {
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .skill {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .skill-name {
        margin-right: 20px;
      }

      svg {
        margin-left: 5px;
        fill: var(--unimp-color);
      }

      .respect {
        width: 30px;
        height: 30px;
      }

      img {
        transform: scale(0.5);
      }
    }
  }

  .middle {
    width: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .name {
      font-size: 3rem;
      padding-bottom: 20px;
      color: var(--secondary-color);
    }
  }

  .right {
    width: 10%;

    svg {
      &.is-active {
        fill: #dd3535;
      }
    }
  }
}

.clip-circle {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--accent-color);
  margin-bottom: 20px;
}
</style>