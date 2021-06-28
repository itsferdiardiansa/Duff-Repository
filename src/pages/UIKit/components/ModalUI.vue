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
        label="Modal with async event"
        variant="danger"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showModalDelete"
      />

      <Button
        label="Modal with JSX content"
        variant="warning"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showModalWarning(lists)"
      />

      <Modal name="delete-confirmation" :onShow="true" :closeable="false">
        <div class="description" v-text="message"></div>
      </Modal>

      <Modal
        title="Update Confirmation"
        content="Are you sure to update this contents"
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
    const lists = ['a', 'b', 'c'];
    const modalShow = ref(false);
    const message = ref('Click to close modal ...');

    const showModalDefault = () => {
      SSModal.show();
    };

    // Modal will be close after
    const showModalDelete = () => {
      const loading = ref(false);
      SSModal.show('delete-confirmation', {
        footer: ({ hideModal }) => {
          const handleClick = async () => {
            loading.value = true;
            message.value = 'Modal will be close after successfully fetch';

            try {
              const response = await fetch(
                'https://jsonplaceholder.typicode.com/todos/1'
              );
              const collections = await response.json();

              hideModal();
              message.value = 'Click to close modal ...';
            } catch (error) {}
          };

          return (
            <Button
              variant="primary"
              label="Fetch Data"
              isLoading={loading.value}
              onClick={handleClick}
            />
          );
        },
        // closeable: false,
        onConfirmFn: hideModal => {
          setTimeout(() => {
            hideModal();
          }, 3000);
        },
      });
    };

    const showModalWarning = data => {
      SSModal.show({
        title: 'JSX Content',
        footer: false,
        content: () => (
          <div>
            {data.map(item => (
              <label>{item}</label>
            ))}
          </div>
        ),
      });
    };

    return {
      lists,
      message,
      codeEl,
      showModalWarning,
      showModalDefault,
      showModalDelete,
      modalShow,
    };
  },
};
</script>
