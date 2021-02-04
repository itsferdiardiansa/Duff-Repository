<template>
  <div class="w-8/12 text-left">
    <div class="font-black text-lg mb-4">
      Button
    </div>

    <div class="grid grid-cols-6 gap-4">
      <Button
        label="Default"
      />

      <Button
          variant="primary"
        >
        Primary
      </Button>

      <Button
          variant="warning"
        >
        Warning
      </Button>

      <Button
          variant="danger"
          :icon="['fa', 'trash']"
        >
        Danger
      </Button>

      <Button
          variant="success"
        >
        Success
      </Button>

      <Button
          variant="dark"
        >
        Dark
      </Button>
    </div>

    <div class="grid grid-cols-6 gap-4 mt-4">
      <Button
        :inverse="true"
      >
        Default
      </Button>

      <Button
          variant="primary"
          :inverse="true"
        >
        Primary
      </Button>

      <Button
          variant="warning"
          :inverse="true"
        >
        Warning
      </Button>

      <Button
          variant="danger"
          :inverse="true"
        >
        Danger
      </Button>

      <Button
          variant="success"
          :inverse="true"
        >
        Success
      </Button>

      <Button
          variant="dark"
          :inverse="true"
          :icon="['fa', 'trash']"
        >
        Dark
      </Button>
    </div>

    <div class="grid grid-cols-6 gap-4 mt-4 items-end">
      <Button
        size="xs"
        :inverse="true"
        :icon="['fa', 'trash']"
      >
        Default
      </Button>

      <Button
          variant="primary"
          size="sm"
          :inverse="true"
          :icon="['fa', 'trash']"
        >
        Primary
      </Button>

      <Button
          variant="warning"
          size="base"
          :inverse="true"
          :icon="['fa', 'trash']"
        >
        Warning
      </Button>

      <Button
          variant="danger"
          size="lg"
          :inverse="true"
          :icon="['fa', 'trash']"
        >
        Danger
      </Button>

      <Button
          variant="success"
          size="xl"
          :inverse="true"
          :icon="['fa', 'trash']"
        >
        Success
      </Button>
    </div>

    <div class="grid grid-flow-col gap-4 auto-cols-max mt-4 items-end">
      <Button
        variant="dark"
        :rounded="false"
        :bold="true"
      >
        No Rounded
      </Button>

      <Button
        variant="dark"
        :pill="true"
        :bold="true"
      >
        Pill
      </Button>

      <Button
        variant="dark"
        :pill="true"
        :bold="true"
        :icon="['fa', 'trash']"
      >
      </Button>

      <Button
        variant="warning"
        :inverse="true"
        :bold="true"
        :icon="['fa', 'trash']"
      />

       <Button
        variant="danger"
        :bold="true"
        :rounded="false"
        :icon="['fa', 'plus']"
      />

      <Button
        variant="warning"
        :inverse="true"
        :pill="true"
        :bold="true"
        @click="handleClickSuccess"
      >
        Pill and Inverse
      </Button>

      <Button
        variant="danger"
        :inverse="true"
        :pill="true"
        :bold="true"
        :icon="['fa', 'trash']"
        @click="handleClick"
      >
        Pill, Inverse and Icon (alert)
      </Button>

      <Button
        variant="dark"
        :inverse="true"
        :pill="true"
        :bold="true"
        :disabled="true"
        :icon="['fa', 'trash']"
      >
        Pill and Inverse but disabled
      </Button>
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'

export default {
  components: {
    Button
  },
  setup() {
    const handleClick = () => {
      self.$alert.show({
        content: 'This is message! dude',
        variant: 'danger',
        timeout: 10000
      })
    }

    const handleClickSuccess = () => {
      self.$alert.show({
        content: '<b>Success is message! dude</b>',
        variant: 'success'
      })
    }

    return {
      handleClick,
      handleClickSuccess
    }
  }
}
</script>