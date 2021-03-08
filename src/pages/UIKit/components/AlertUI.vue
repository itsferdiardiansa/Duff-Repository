<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">Alert</div>

    <div ref="codeEl" class="alert-demo">
      <Button
        label="Default"
        :icon="['fa', 'sticky-note']"
        @click="showAlertDefault"
      />

      <Button
        label="Success"
        variant="success"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showAlertSuccess"
      />

      <Button
        label="Primary"
        variant="primary"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showAlertPrimary"
      />

      <Button
        label="Dark"
        variant="dark"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showAlertDark"
      />

      <Button
        label="Warning"
        variant="warning"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showAlertWarning"
      />

      <Button
        label="Danger"
        variant="danger"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showAlertDanger"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Alert from '@plugin/alert/components';
import Button from '@common/Button';
import FontAwesomeIcon from '@common/FontAwesome';
import { computed, ref } from 'vue';

export default {
  components: {
    Alert,
    Button,
  },
  beforeCreate() {},
  setup() {
    const codeEl = ref();

    const showAlertDefault = () => {
      sAlert.show({
        animation: 'slide-bottom',
        closeable: true,
        content: (
          <div>
            <marquee>Alert content ...</marquee>
          </div>
        ),
      });
    };

    const showAlertSuccess = () => {
      sAlert.show({
        variant: 'success',
        animation: 'slide-left',
        title: 'Success',
        content: (
          <div>
            <marquee>Success</marquee>
            <p>Alert content 2 ...</p>
          </div>
        ),
      });
    };

    const showAlertWarning = () => {
      sAlert.show({
        variant: 'warning',
        animation: 'slide-left',
        closeable: true,
        duration: 5000,
        title: 'Warning',
        content: <div>You have been warned</div>,
        onClose: () => {
          console.log('Alert warning has been close');
        },
      });
    };

    const showAlertDanger = () => {
      sAlert.show({
        variant: 'danger',
        animation: 'slide-bottom',
        duration: 5000,
        content: <p>Your session is expired</p>,
        onClose: () => {
          console.log('Alert warning has been close');
        },
      });
    };

    const showAlertPrimary = () => {
      sAlert.show({
        variant: 'primary',
        animation: 'slide-left',
        closeable: true,
        duration: 5000,
        content: 'Your session is expired',
        onClose: () => {
          console.log('Alert warning has been close');
        },
      });
    };

    const showAlertDark = () => {
      sAlert.show({
        variant: 'dark',
        animation: 'slide-left',
        duration: 5000,
        content: 'Your session is expired',
        onClose: () => {
          console.log('Alert warning has been close');
        },
      });
    };

    return {
      codeEl,
      showAlertDefault,
      showAlertSuccess,
      showAlertWarning,
      showAlertDanger,
      showAlertPrimary,
      showAlertDark,
    };
  },
};
</script>
