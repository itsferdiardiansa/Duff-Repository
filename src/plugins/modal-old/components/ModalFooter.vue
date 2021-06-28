<template>
  <div class="button-action">
    <Button
      ref="modalCancelBtnEL"
      label="No"
      variant="dark"
      :inverse="true"
      :bold="true"
      :icon="['fa', 'times-circle']"
      @click="handleCancel"
    />

    <Button
      ref="modalConfirmBtnEl"
      label="Yes"
      variant="dark"
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
