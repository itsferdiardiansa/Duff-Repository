<template>
  <div class="p-4">
    <!-- <ButtonUI /> -->

    <!-- <BadgeUI /> -->

    <FormInputUI />

    <!-- <AlertUI /> -->
  </div>
</template>
<script>
/* eslint-disable */
import ButtonUI from './components/ButtonUI';
import BadgeUI from './components/BadgeUI';
import FormInputUI from './components/FormInputUI';
// import AlertUI from './components/AlertUI'

export default {
  layout: 'Blank',
  components: {
    ButtonUI,
    BadgeUI,
    // AlertUI,
    FormInputUI,
  },
};
</script>
