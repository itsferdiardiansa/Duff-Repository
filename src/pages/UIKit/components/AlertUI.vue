<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">Notification</div>

    <div ref="codeEl" class="alert-demo">
      <Button
        label="Default"
        :icon="['fa', 'sticky-note']"
        @click="showNotificationDefault"
      />

      <Button
        label="Success"
        variant="success"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showNotificationSuccess"
      />

      <Button
        label="Primary"
        variant="primary"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showNotificationPrimary"
      />

      <Button
        label="Dark"
        variant="dark"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showNotificationDark"
      />

      <Button
        label="Warning"
        variant="warning"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showNotificationWarning"
      />

      <Button
        label="Danger"
        variant="danger"
        class="ml-2"
        :icon="['fa', 'sticky-note']"
        @click="showNotificationDanger"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { ref } from 'vue';
import Notification from '@plugin/notification/components';
import Button from '@common/Button';

export default {
  components: {
    Notification,
    Button,
  },
  beforeCreate() {},
  setup() {
    const codeEl = ref();

    const showNotificationDefault = () => {
      SSNotification({
        animation: 'slide-bottom',
        closeable: true,
        content: (
          <div>
            <marquee>Notification content ...</marquee>
          </div>
        ),
      });
    };

    const showNotificationSuccess = () => {
      SSNotification({
        variant: 'success',
        animation: 'slide-left',
        title: 'Success',
        content: (
          <div>
            <marquee>Success</marquee>
            <p>Notification content 2 ...</p>
          </div>
        ),
      });
    };

    const showNotificationWarning = () => {
      SSNotification({
        variant: 'warning',
        animation: 'slide-left',
        closeable: true,
        duration: 5000,
        title: 'Warning',
        content: <div>You have been warned</div>,
        onClose: () => {
          console.log('Notification warning has been close');
        },
      });
    };

    const showNotificationDanger = () => {
      SSNotification({
        variant: 'danger',
        animation: 'slide-bottom',
        duration: 5000,
        content: <p>Your session is expired</p>,
        onClose: () => {
          console.log('Notification warning has been close');
        },
      });
    };

    const showNotificationPrimary = () => {
      SSNotification({
        variant: 'primary',
        animation: 'slide-left',
        closeable: true,
        duration: 5000,
        content: 'Your session is expired',
        onClose: () => {
          console.log('Notification warning has been close');
        },
      });
    };

    const showNotificationDark = () => {
      SSNotification({
        variant: 'dark',
        animation: 'slide-left',
        duration: 5000,
        content: 'Your session is expired',
        onClose: () => {
          console.log('Notification warning has been close');
        },
      });
    };

    return {
      codeEl,
      showNotificationDefault,
      showNotificationSuccess,
      showNotificationWarning,
      showNotificationDanger,
      showNotificationPrimary,
      showNotificationDark,
    };
  },
};
</script>
