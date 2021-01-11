<template>
  <span 
    class="loader"
    :style="customStyles">
  </span>
</template>
<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    rounded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    customStyles() {
      let style = {}

      if(this.width !== null)
        style.width = this.width

      if(this.height !== null)
        style.height = this.height

      style.borderRadius = this.rounded ? '4px' : 0

      return style
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes animation-slide {
  0% {
    background-position: -300px center;
  }

  100% {
    background-position: 300px center;
  }
}
.loader {
  display: inline-block;
  height: 22px;
  width: 100%;
  border-radius: 4px;
  background-color: rgb(206, 206, 206);
  background-image: linear-gradient(89deg, rgb(200, 200, 200), rgb(200, 200, 200));
  background-size: 99% 100%;
  background-repeat: no-repeat;
  animation: 1.3s linear 1ms infinite normal backwards running animation-slide;
  animation: 1.3s linear 1ms infinite normal backwards running animation-slide;
}
</style>