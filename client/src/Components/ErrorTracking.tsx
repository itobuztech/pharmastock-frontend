import React from 'react';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (import.meta.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: import.meta.env.REACT_APP_SENTRY_DSN || '',
    integrations: [new BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.5,
  });
}


export default function ErrorTracking() {
  return <div></div>;
}
