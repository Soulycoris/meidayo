<template>
  <div class="loading-animate">
    <transition name="animate__fadeOutRight">
      <div class="loading" v-if="loading"></div>
    </transition>
    <transition name="fade">
      <div class="logo-title" v-if="loading">
        <p class="blind__logo__inner">
          <svg viewBox="0 0 310 188">
            <path
              fill-rule="evenodd"
              fill="#ffffff"
              d="M195.4,109.6h-7.2v14.7h6.9c14.1,0,24.7,10.5,24.7,24.5c0,14-10.6,24.6-24.7,24.6h-6.9V188h7.2c21.9,0,39.2-17.5,39.2-39.2S217.4,109.6,195.4,109.6z M137.8,0c-22.2,0-40.1,18-40.1,40.3c0,22.4,17.9,40.4,40.1,40.4s40.2-18,40.2-40.4C178,18,160,0,137.8,0zM137.9,66.1c-14.2,0-25.6-11.5-25.6-25.8c0-14.2,11.4-25.7,25.6-25.7c14.1,0,25.6,11.5,25.6,25.7C163.5,54.6,152,66.1,137.9,66.1zM151,188h14.7v-78.4H151V188z M14.6,1.2H0v78.4h14.6V1.2z M254.7,188h44.5v-14.7h-44.5V188z M254.7,156.2h44.5v-14.7h-44.5V156.2zM254.7,124.3h44.5v-14.7h-44.5V124.3z M129.9,131.7c0-12.3-9.8-22-22.1-22h-40v14.7h40.1c4.1,0,7.3,3.2,7.3,7.4c0,4.1-3.3,7.4-7.3,7.4H81l32.5,48.9h17.6l-22.8-34.3C120.5,153.5,129.9,143.8,129.9,131.7z M27.9,109.6H0v14.7h28c4.2,0,7.4,3.2,7.4,7.4c0,4.1-3.3,7.4-7.4,7.4H0V188h14.6v-34.3h13.3c12.4,0,22.2-9.7,22.2-22C50.1,119.3,40.2,109.6,27.9,109.6zM83.7,40.3c0-21.8-17.3-39.1-39.2-39.1h-7.2v14.7h6.9C58.4,15.9,69,26.3,69,40.3c0,14-10.6,24.6-24.7,24.6h-6.9v14.7h7.2C66.4,79.6,83.7,62.1,83.7,40.3z M67.8,188h14.6v-34.3H67.8V188z M266.8,79.6h14.6V44.3L310,1.2h-17.7L274,28.8L255.7,1.2h-17.6l28.6,43.1V79.6z M212.9,1.2h-14.6v78.4h42.6V64.9h-28V1.2z"
            ></path>
          </svg>
        </p>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">

defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scope>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.animate__fadeOutRight-leave-active {
  animation: fadeOutRight 0.5s;
}

@-webkit-keyframes fadeOutRight {
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes fadeOutRight {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}

.loading {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9001;
  width: 100%;
  height: 100%;
  background-color: #00f;
  transform-origin: 0 50%;
}
.logo-title {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9002;
  width: 100vw;
  line-height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  .blind__logo__inner {
    width: 50%;
    height: 50%;
    position: relative;
    overflow: hidden;
  }
}
</style>
