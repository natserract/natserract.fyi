import posthog from "posthog-js";
import {getVisitorInfo} from "@util/fingerprint.ts";

export enum POSTHOG_EVENT {
    USER_CLICKED_POST = 'user_clicked_post',
    USER_CLICKED_PROJECTS_PAGE = 'user_clicked_projects_page',
    USER_CLICKED_PROJECT = 'user_clicked_project',
}

const PUBLIC_POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY
const IS_PROD = import.meta.env.PROD

export function trackEvent(event: POSTHOG_EVENT, properties?: Record<string, any>) {
    const visitorInfo = getVisitorInfo()

    if (PUBLIC_POSTHOG_KEY && IS_PROD) {
        posthog.identify(visitorInfo.fingerprint.toString(), {
            ...properties && {
                meta: {
                    ...properties,
                }
            },
            visitor: visitorInfo
        });
        posthog.capture(event)
    }
}