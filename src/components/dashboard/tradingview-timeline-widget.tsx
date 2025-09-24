
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewTimelineWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (!container.current || container.current.querySelector('script')) {
        return;
      }

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
          "displayMode": "adaptive",
          "feedMode": "all_symbols",
          "colorTheme": "light",
          "isTransparent": true,
          "locale": "es",
          "width": "100%",
          "height": "100%"
      });
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container h-full" ref={container}>
      <div className="tradingview-widget-container__widget h-full"></div>
      <div className="tradingview-widget-copyright"><a href="https://es.tradingview.com/news-flow/?priority=top_stories" rel="noopener nofollow" target="_blank"><span className="blue-text">Sigue todos los mercados en TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewTimelineWidget);
