<template>
  <div class="create-notification">
    <Button
      variant="primary"
      label="Add Notification"
      :icon="['fa', 'plus']"
      :bold="true"
      @click="addNotification"
    />
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import Button from '@common/Button';

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter();

    const addNotification = () => {
      router.push('/notification/create');
    };

    return {
      addNotification,
    };
  },
};
</script>
<style lang="scss" scoped>
.create-notification {
  @apply flex items-center justify-end;
}
</style>
