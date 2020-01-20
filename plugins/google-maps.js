import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyD61aV5hw8CWI9G64m036IXjUl4LSwOcPY",
        libraries: "places"
    }
});
