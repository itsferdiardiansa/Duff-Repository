<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">Modal</div>

    <div ref="codeEl" class="alert-demo">
      <Button
        label="Default modal"
        variant="dark"
        :icon="['fa', 'sticky-note']"
        @click="showModalDefault"
      />

      <Button
        label="Modal with custom footer and content"
        variant="warning"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showModalDelete"
      />

      <Modal name="delete-confirmation" :onConfirmFn="showAlert">
        <div class="description">Are you sure to delete this content ...</div>
      </Modal>

      <Modal
        name="update-confirmation"
        title="Update Confirmation"
        content="Are you sure to update this contents"
        :onConfirmFn="showAlert"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, ref } from 'vue';
import Button from '@common/Button';

export default {
  components: {
    Button,
  },
  beforeCreate() {},
  setup() {
    const codeEl = ref();

    const showModalDefault = () => {
      sModal.show('update-confirmation', {
        animation: 'slide-bottom',
        content: (
          <div>
            <marquee>Alert content ...</marquee>
          </div>
        ),
      });
    };

    const showAlert = () => {
      alert('Clicked');
    };

    const showModalDelete = () => {
      sModal.show({
        footer: (
          <Button
            variant="primary"
            icon={['fa', 'search']}
            rounded={false}
            onClick={showAlert}
          >
            Preview
          </Button>
        ),
        content: (
          <div>
            <img src="https://cdn.wallpapersafari.com/60/19/FfWM9R.jpg" />
          </div>
        ),
        onConfirmFn: () => {
          console.log('Confirm ...');
        },
      });
    };

    return {
      codeEl,
      showModalDefault,
      showModalDelete,
      showAlert,
    };
  },
};
</script>
