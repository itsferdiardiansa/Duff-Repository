<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">
      Badge
    </div>
    
    <div class="grid grid-flow-col gap-4 auto-cols-max mt-4 items-end">
      <Badge
        variant="danger"
        size="xs"
        :rounded="true"
        :pill="true"
      >
        99+ New
      </Badge>

      <Badge
        variant="danger"
        size="xs"
        label="40%"
        class="bg-red-300 text-red-600"
        :rounded="true"
      />

      <Badge
        variant="primary"
        size="sm"
        :rounded="true"
        :pill="true"
      >
        99+
      </Badge>

      <Badge
        variant="dark"
        size="xs"
        :rounded="true"
        :pill="true"
        :dot="true"
      />

      <Badge
        variant="primary"
        size="sm"
        :rounded="true"
        :pill="true"
        :dot="true"
      />

      <Badge
        variant="danger"
        :rounded="true"
        :pill="true"
        :dot="true"
      />

      <Badge
        variant="warning"
        size="lg"
        :rounded="true"
        :pill="true"
        :dot="true"
      />

      <Badge
        variant="dark"
        size="xl"
        :rounded="true"
        :pill="true"
        :dot="true"
      />

      <Badge
        variant="warning"
        :inverse="true"
        :pill="true"
        :bold="true"
      >
        Pill
      </Badge>

      <Badge
        variant="dark"
        :pill="true"
        :bold="true"
        :icon="['fa', 'trash']"
      >
      </Badge>

      <Badge
        variant="warning"
        :inverse="true"
        :bold="true"
        :icon="['fa', 'trash']"
      />

       <Badge
        variant="danger"
        :bold="true"
        :rounded="false"
        :icon="['fa', 'plus']"
      />

      <Badge
        variant="warning"
        :inverse="true"
        :pill="true"
        :bold="true"
      >
        Pill and Inverse
      </Badge>

      <Badge
        variant="danger"
        :inverse="true"
        :pill="true"
        :bold="true"
        :icon="['fa', 'trash']"
      >
        Pill, Inverse and Icon
      </Badge>
    </div>
  </div>
</template>
<script>
import Badge from '@common/Badge'

export default {
  components: {
    Badge
  }
}
</script>