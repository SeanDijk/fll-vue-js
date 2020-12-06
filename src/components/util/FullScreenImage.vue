<template>
  <modal ref="modal" class="img-modal">
    <button class="btn-icon close" v-on:click="close"><img src="@/assets/icons/close-24px.svg"/></button>
    <span v-if="description" class="description">{{ description }}</span>
    <img :src="src" class="full-screen-image"/>
  </modal>
</template>

<script>
import Modal from "@/components/util/Modal";

export default {
  name: "FullScreenImage",
  components: {Modal},
  data: function() {
    return {
      src: '',
      description: ''
    }
  },
  methods: {
    close: function () {
      this.$refs.modal.close()
    },
    show: function (src, description) {
      this.src = src
      this.description = description
      this.$refs.modal.show()
    }
  }
}
</script>

<style scoped>
.img-modal {
  width: 100%;
  height: 100%;

}
.full-screen-image {
  width: 100vw;
  height: 100vh;

  /*max-height: 100%;*/
  max-width: 100%;
  object-fit: contain;
  background-color: black;
}

.description {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
}

.close {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>