<template>
  <div class="top-list">
    <div class="top-list--title">
      <h2 class="font-bold text-2xl">List Admin CMSLOKET</h2>
    </div>

    <div class="top-list--create">
      <Button
        variant="primary"
        :icon="['fa', 'plus']"
        :bold="true"
        @click="addAdmin"
      >
        Add Admin
      </Button>
    </div>
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

    const addAdmin = () => {
      router.push('/list-admin/create');
    };

    return {
      addAdmin,
    };
  },
};
</script>
<style lang="scss" scoped>
.top-list {
  @apply flex items-center justify-between;

  &--title {
    @apply flex items-center;
  }

  &--create {
    @apply float-right;
  }
}
</style>
