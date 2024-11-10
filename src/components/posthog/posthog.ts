import posthog from 'posthog-js';

const PUBLIC_POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY
if (PUBLIC_POSTHOG_KEY) {
    posthog.init(PUBLIC_POSTHOG_KEY, {
        api_host: 'https://app.posthog.com',
        loaded: function (posthog) {
            posthog.config.debug = false;
        },
    });
}
