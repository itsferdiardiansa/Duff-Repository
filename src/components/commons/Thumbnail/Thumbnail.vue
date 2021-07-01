<template>
  <div
    :class="`${prefixClass}-thumbnail`"
    v-bind="$attrs"
    @click="previewImage"
  >
    <div :class="`${prefixClass}-thumbnail--wrapper`">
      <img v-lazy="src" :alt="description" />
    </div>
  </div>
</template>
<script>
import errorImage from '@asset/image-default.jpg';

export default {
  props: {
    src: {
      type: String,
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const previewImage = () => {
      let { src: imgSrc } = props;

      imgSrc = imgSrc ? imgSrc : errorImage;

      SSModal.show({
        footer: false,
        autoWidth: true,
        customPanel: {
          style: {
            padding: 0,
          },
        },
        content: () => (
          <div>
            <img
              style={{
                maxWidth: '600px',
                width: 'auto',
                height: 'auto',
                maxHeight: '400px',
              }}
              src={imgSrc}
              alt="image preview"
            />
          </div>
        ),
      });
    };

    return {
      previewImage,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-thumbnail {
  @apply relative overflow-hidden m-auto;
  background-color: rgb(206, 206, 206);

  &--wrapper {
    img {
      @apply w-full h-full absolute object-cover duration-500 opacity-100;

      &[lazy='loading'] {
        @apply opacity-0;
      }
    }
  }
}
</style>
