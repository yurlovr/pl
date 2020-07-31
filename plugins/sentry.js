import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
Sentry.init({
  dsn: 'https://db85ef48d8304df3a03e890e6cdfa091@o399681.ingest.sentry.io/5371935',
  integrations: [new VueIntegration({Vue, attachProps: true})],
});
