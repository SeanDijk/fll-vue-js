<template>
  <div class="wrapper">
    <transition name="from-bottom">
      <div class="snackbar" v-if="shown">
        <div class="card card-dark card-content">
          <slot></slot>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: "Snackbar",
  data: function () {
    return {
      shown: false
    }
  },
  methods: {

    open: function () {
      this.shown = true
      setTimeout(() => this.close(), 4000);
    },

    close: function () {
      this.shown = false
    }
  }
}
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: auto;
}


.from-bottom-enter-active, .from-bottom-leave-active {
  transition: bottom .5s;
}
.from-bottom-enter, .from-bottom-leave-to {
  bottom: -100%;
}

</style>