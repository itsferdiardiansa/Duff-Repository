<template>
  <div class="p-4">
    <ButtonUI />

    <BadgeUI />

    <DropdownUI />

    <FormInputUI />

    <AlertUI />

    <ModalUI />
  </div>
</template>
<script>
/* eslint-disable */
import ButtonUI from './components/ButtonUI';
import BadgeUI from './components/BadgeUI';
import FormInputUI from './components/FormInputUI';
import AlertUI from './components/AlertUI';
import ModalUI from './components/ModalUI';
import DropdownUI from './components/DropdownUI';

export default {
  layout: 'Blank',
  components: {
    ButtonUI,
    BadgeUI,
    ModalUI,
    AlertUI,
    FormInputUI,
    DropdownUI,
  },
};
</script>
