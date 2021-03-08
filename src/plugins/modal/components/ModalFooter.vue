<template>
  <div class="button-action">
    <Button
      ref="modalCancelBtnEL"
      label="No"
      variant="danger"
      :bold="true"
      :icon="['fa', 'times-circle']"
      @click="handleCancel"
    />

    <Button
      ref="modalConfirmBtnEl"
      label="Yes"
      variant="success"
      class="ml-2"
      :bold="true"
      :icon="['fa', 'check-circle']"
      @click="handleConfirm"
    />
  </div>
</template>
<script>
import Button from '@common/Button';

export default {
  name: 'PLModalFooterDefault',
  components: {
    Button,
  },
  props: {
    handleConfirm: {
      type: Function,
      default: () => {},
    },
    handleCancel: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.button-action {
}
</style>
