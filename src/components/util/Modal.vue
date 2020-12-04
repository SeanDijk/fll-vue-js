<template>
<div class="background-cover" v-if="!hidden" v-on:click="close()">

  <div class="modal" v-on:click.stop>
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "Modal",
  data: function () {
    return {
      hidden: true
    }
  },
  methods: {
    close: function (){
      this.hidden = true;
    },
    show: function () {
      this.hidden = false;
    }
  }
}
</script>

<style scoped>

.background-cover {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(30, 30, 30, .6);
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
}


.modal{
  z-index: 1001;
  cursor: default;
  box-sizing: border-box;
}

</style>