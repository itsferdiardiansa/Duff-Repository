<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button
        :data-title="data.path"
        size="sm"
        variant="orange"
        @click="handleClick(data)"
      >
        <img svg-inline class="w-3" src="@icon/pencil.svg" />
      </Button>
    </div>
  </div>
</template>
<script>
import Button from '@common/Button';

export default {
  components: {
    Button,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const handleClick = data => {
      console.log('Clicked ...', data);
    };

    return {
      handleClick,
    };
  },
};
</script>
