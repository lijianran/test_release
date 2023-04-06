import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";

import { update_test } from "./update"

update_test()


createApp(App).mount("#app");
