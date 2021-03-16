<template>
  <div
    :class="[`${prefixClass}-control--file`, { 'on-preview': imgSrc.length }]"
  >
    <input
      type="file"
      accept="image/png, image/jpeg"
      v-bind="$attrs"
      v-if="!imgSrc.length"
      @change="handleChange"
    />

    <div
      class="file-preview"
      @mouseenter="onMouseInteraction"
      @mouseleave="onMouseInteraction"
      v-if="imgSrc.length"
    >
      <img class="file-preview--img" :src="imgSrc" />

      <div class="file-preview--btn" v-if="showCloseBtn">
        <transition name="slide-top" mode="out-in" appear>
          <div class="flex">
            <font-awesome-icon
              class="w-6 mr-3"
              :icon="['fa', 'eye']"
              @click="previewImage"
            />
            <font-awesome-icon :icon="['fa', 'trash']" @click="removeImage" />
          </div>
        </transition>
      </div>
    </div>

    <template v-if="convertingImage">
      <div class="file-loader">
        <Spinner :width="40" :height="40" />
      </div>
    </template>
    <template v-else-if="onFileError">
      <div class="file-hero" v-if="!imgSrc.length">
        <img svg-inline src="@icon/image-broken.svg" />
        <label class="flex flex-col justify-center text-center">
          <span>Image not found</span>
          <span>Click or drag to upload</span>
        </label>
      </div>
    </template>
    <template v-else>
      <div class="file-hero" v-if="!imgSrc.length">
        <font-awesome-icon :icon="['fa', 'upload']" />
        <label>Click or drag to upload</label>
      </div>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, ref, unref, nextTick } from 'vue';
import Spinner from '@common/Loader/Spinner';
import { toBase64, urlToBase64 } from '@util/imageProcessing';

export default {
  name: 'CMFileUpload',
  components: {
    Spinner,
  },
  emits: ['change', 'update:modelValue'],
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const imgSrc = ref('');
    const showCloseBtn = ref(false);
    const convertingImage = ref(false);
    const onFileError = ref(false);

    const onMouseInteraction = () => {
      showCloseBtn.value = !showCloseBtn.value;
    };

    const removeImage = () => {
      imgSrc.value = '';

      emit('update:modelValue', '');
    };

    const previewImage = () => {
      sModal.show({
        footer: false,
        content: () => (
          <div>
            <img class="w-full" src={imgSrc.value} alt="image preview" />
          </div>
        ),
      });
    };

    const handleChange = async e => {
      convertingImage.value = true;
      try {
        const url = await toBase64(e.target.files[0]);

        imgSrc.value = url;

        emit('update:modelValue', btoa(url));
        emit('change', e, url);
      } catch (error) {
      } finally {
        convertingImage.value = false;
      }
    };

    nextTick(async () => {
      const modelValue = props.modelValue;

      if (modelValue !== undefined && modelValue.length) {
        convertingImage.value = true;

        try {
          const url = await urlToBase64(modelValue);

          imgSrc.value = url;
          emit('update:modelValue', btoa(url));
        } catch (error) {
          onFileError.value = true;
          emit('update:modelValue', '');
        } finally {
          convertingImage.value = false;
        }
      }
    });

    return {
      onFileError,
      showCloseBtn,
      handleChange,
      onMouseInteraction,
      removeImage,
      previewImage,
      imgSrc,
      convertingImage,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-control {
  &--file {
    @apply w-auto h-auto border border-gray-300 rounded-lg overflow-hidden relative;
    max-width: 200px;
    max-height: 200px;
    min-height: 100px;

    &.on-preview {
      min-height: unset;
    }

    input {
      @apply w-full h-full absolute top-0 left-0 opacity-0 z-50 cursor-pointer;
    }

    .file {
      &-loader {
        @apply relative flex justify-center items-center bg-gray-300;
        min-height: 200px;
      }

      &-preview {
        @apply w-auto h-auto flex justify-center relative z-10;
        max-width: 100%;
        max-height: 100%;

        &--img {
          @apply w-auto h-auto left-0 top-0;
          max-width: 100%;
          max-height: 100%;
        }

        &--btn {
          @apply w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50;
          max-height: 200px;

          svg {
            @apply w-4 text-white hover:text-gray-50 cursor-pointer z-50;
          }
        }
      }

      &-hero {
        @apply flex items-center justify-center flex-col bg-gray-200;
        height: 150px;

        svg {
          @apply w-9;
        }

        label {
          @apply mt-3 text-sm;
        }
      }
    }
  }
}
</style>
