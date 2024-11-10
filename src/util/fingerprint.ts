import {ClientJS} from 'clientjs'

export function getVisitorInfo() {
    const client = new ClientJS()
    const geoLocation = getLocationFromIpApi();

    return {
        fingerprint: client.getFingerprint(),
        browser: client.getBrowser(),
        OS: client.getOS(),
        device: client.getDevice(),
        userAgent: client.getUserAgent(),
        currentResolution: client.getCurrentResolution(),
        colorDepth: client.getColorDepth(),
        cpu: client.getCPU(),
        mobileData: {
            isMobile: client.isMobile(),
            isMobileMajor: client.isMobileMajor(),
            isMobileAndroid: client.isMobileAndroid(),
            isMobileOpera: client.isMobileOpera(),
            isMobileWindows: client.isMobileWindows(),
            isMobileBlackBerry: client.isMobileBlackBerry(),
        },
        browserData: {
            isChrome: client.isChrome(),
            isFirefox: client.isFirefox(),
            isSafari: client.isSafari(),
            isOpera: client.isOpera(),
        },
        geoLocation,
        timestamp: new Date().toISOString()
    }
}

export function getLocationFromIpApi() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipapi.co/json/', false);
    try {
        xhr.send();
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const locationData = {
                ip: response.ip,
                city: response.city,
                region: response.region,
                country: response.country_name,
                postal: response.postal,
                latitude: response.latitude,
                longitude: response.longitude,
                timezone: response.timezone,
                source: 'ipapi'
            };
            return locationData;
        }
    } catch (e) {
        console.error('Error in sync location request:', e);
    }

    return getLocationFromTimezone()
}

export function getLocationFromTimezone() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timeZone) return null;

    const tzParts = timeZone.split('/');
    return {
        continent: tzParts[0] || 'Unknown',
        city: tzParts[1] ? tzParts[1].replace('_', ' ') : 'Unknown',
        timezone: timeZone,
        source: 'timezone'
    };
}
