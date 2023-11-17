import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./client";

const vuetify = createVuetify({
  components,
  directives,
});

import "./assets/main.css";
const app = createApp({
  setup() {
    provide(DefaultApolloClient, client);
  },
  render: () => h(App),
});

app.use(router);
app.use(vuetify);

app.mount("#app");
