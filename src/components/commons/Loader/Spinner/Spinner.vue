<template>
  <div :class="`${prefixClass}-spinner`" :style="getStyle">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'CMSpinner',
  props: {
    width: {
      type: [Number, String],
      default: 10,
    },
    height: {
      type: [Number, String],
      default: 10,
    },
  },
  setup(props) {
    const getStyle = computed(() => {
      const { width, height } = props;
      let style = {};

      style = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      };

      return style;
    });

    return {
      getStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-spinner {
  display: inline-block;
  position: relative;
  height: 70%;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: #{$prefixClass}-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &::nth-child(1) {
      animation-delay: -0.45s;
    }

    &::nth-child(2) {
      animation-delay: -0.3s;
    }

    &::nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
@keyframes #{$prefixClass}-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
