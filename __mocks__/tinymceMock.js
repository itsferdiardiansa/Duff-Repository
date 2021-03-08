jest.mock('@tinymce/tinymce-vue/lib/cjs/main/ts/Utils', () => ({
  ...jest.requireActual('@tinymce/tinymce-vue/lib/cjs/main/ts/Utils'),
  uuid: jest.fn(() => 'tiny-mce__12e4'),
}));
