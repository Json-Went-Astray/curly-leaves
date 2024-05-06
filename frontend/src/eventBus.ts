import { createApp, ref } from 'vue';

const eventBus = createApp({});
eventBus.provide('eventBus', ref({}));

export { eventBus };