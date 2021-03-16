<template>
  <div class="create">
    <Button
      variant="orange"
      label="Add Role"
      :icon="['fa', 'plus']"
      :bold="true"
      @click="addRole"
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

    const addRole = () => {
      router.push('/role/create');
    };

    return {
      addRole,
    };
  },
};
</script>
<style lang="scss" scoped>
.create {
  float: right;
}
</style>
