import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import {sentry_dsn} from '../.env.js'
Sentry.init({
  dsn: sentry_dsn,
  integrations: [new VueIntegration({
    Vue,
    attachProps: true,
    tracing: true,
    tracingOptions: {
      trackComponents: true,
    },
  })],
});
