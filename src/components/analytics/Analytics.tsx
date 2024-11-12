import {useCallback, useEffect, useRef} from "react";

enum IFRAME_MESSAGES {
    IFRAME_LOADED = 'IFRAME_LOADED',
    IFRAME_ON_READY = 'IFRAME_ON_READY'
}

export default function Analytics() {
    const iframeContainerRef = useRef<HTMLDivElement | null>(null);
    const iframeElRef = useRef<HTMLIFrameElement | null>(null);

    const destroyIframe = useCallback(() => {
        const container = iframeContainerRef.current
        while (container?.firstChild) {
            container.removeChild(container.firstChild)
        }
    }, [])

    const setIframeUrl = useCallback((attributes: { src: string }) => {
        const iframeEl = iframeElRef.current
        if (!iframeEl) {
            initIframe(attributes)
        }

        setTimeout(() => {
            const iframeDoc = iframeEl!.contentWindow!.document;
            iframeDoc.open()
                .write(`
             <body onload="window.location.href='${attributes.src}'; parent.postMessage('${IFRAME_MESSAGES.IFRAME_LOADED}', '*')"></body>
             <script>
                window.document.onreadystatechange = function () {
                  if (window.document.readyState === 'complete') {
                    parent.postMessage('${IFRAME_MESSAGES.IFRAME_ON_READY}', '*')
                  }
                };
              <\/script>
        `)
            iframeDoc.close()
        }, 0)
    }, [])

    const initIframe = useCallback((attributes: { src: string }) => {
        const iframeEl = document.createElement("iframe");
        iframeEl.setAttribute('width', '100%')
        iframeEl.setAttribute('height', '100%')
        iframeEl.setAttribute('frameborder', '0')
        iframeEl.setAttribute('allowfullscreen', '')
        iframeEl.setAttribute('src', attributes.src);

        // Append to container
        iframeContainerRef.current!.appendChild(iframeEl);
        iframeElRef.current = iframeEl;
        setIframeUrl(attributes)
    }, [setIframeUrl])

    const listenForEvents = useCallback(() => {
        const handleMessage = (event) => {
            if (event.data === IFRAME_MESSAGES.IFRAME_LOADED) {
                iframeElRef.current!.setAttribute('class', 'min-h-screen')
            }
            if (event.data === IFRAME_MESSAGES.IFRAME_ON_READY) {
                //
            }
        };

        window.addEventListener('message', handleMessage, false);
        return () => {
            destroyIframe()
            window.removeEventListener('message', handleMessage, false);
        };
    }, [destroyIframe])

    useEffect(() => {
        const cleanup = listenForEvents()
        initIframe({
            src: "https://us.posthog.com/embedded/frzr_AJM7Z4nIo5-6UNbgH_GjFF3kQ"
        })
        return cleanup
    }, [initIframe])

    return (
        <div className='p-5 bg-[#f3f4ef] h-full min-h-screen'>
            <div ref={iframeContainerRef}></div>
        </div>
    )
}