<template>
<div class="background-cover" v-if="!hidden" v-on:click="close()">
<!--todo use dialog html element, in the future when compatible use: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement-->
  <div class="modal-scroll-container" role="dialog">
    <div class="modal" v-on:click.stop>
      <slot></slot>
    </div>
    <div class="flex-pusher"></div>
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
      document.body.classList.remove('modal-open')
      this.hidden = true;
    },
    show: function () {
      document.body.classList.add('modal-open')
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

.modal-scroll-container {
  /*box-sizing: border-box;*/
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
  flex-direction: column;

}

.modal{
  max-height: 100%;
  z-index: 1001;
  cursor: default;
  box-sizing: border-box;
}
/*Used to push the modal a bit above the center*/
.flex-pusher {
  height: 10%;
}

</style>