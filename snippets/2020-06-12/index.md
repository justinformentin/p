---
title: "Network speed check"
path: "network-speed-check"
date: "2020-06-12"
lang: JavaScript
published: "true"
chunk: "Leveraging the Browser's navigator connection properties to get user network speeds."
---




```js
interface ConnectionInfo {
  type: string | null;
  downlink: string | null;
}

interface ConnectionSpeed {
  speed: string | null;
}

interface NetworkInfo extends ConnectionInfo, ConnectionSpeed {
  weightedAverage: string;
}

function networkCheck(): Promise<NetworkInfo | false> {
  const networkTypes = {
    SLOW: 'slow',
    MODERATE: 'moderate',
    FAST: 'fast',
  };
  const speedTypes = {
    [networkTypes.SLOW]: 1,
    [networkTypes.MODERATE]: 2,
    [networkTypes.FAST]: 3,
  };
  const etMap = {
    'slow-2g': networkTypes.SLOW,
    '2g': networkTypes.SLOW,
    '3g': networkTypes.MODERATE,
    '4g': networkTypes.FAST,
  };

  const con =
    // @ts-ignore Properties non-existant in TS typedef
    navigator.connection || navigator.mozConnection || navigator.webkitConnetion;

  const SMF = (slow: boolean, moderate: boolean): string =>
    slow ? networkTypes.SLOW : moderate ? networkTypes.MODERATE : networkTypes.FAST;

  const measureConnectionSpeed = () =>
    new Promise(res => {
      const imageAddr = 'testImg.jpg';
      const downloadSize = 1040000; //bytes
      const startTime = new Date().getTime();
      const download = new Image();
      const cacheBuster = '?nnn=' + startTime;
      download.src = imageAddr + cacheBuster;
      download.onerror = () => res(false);
      download.onload = function() {
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = downloadSize * 8;
        const bps = bitsLoaded / duration;
        const kbps = bps / 1024;
        const mbps = kbps / 1024;
        // Netflix recommendations:
        // 3 Mbps connection for one standard-quality stream
        // 5 Mbps for a high-definition stream.
        // 10 Mbps for two simultaneous HD quality streams
        // So these numbers are extrapolated from that recommendation
        // considering multiple streams.
        res(mbps);
      };
    });

  const calcValues = (type, downlink, speed) => {
    if (type && downlink && speed) {
      // download speed is the most important, so we weight it more
      const weightedSpeedVal = speedTypes[speed] * 5;
      const overallVals = speedTypes[downlink] + speedTypes[type] + weightedSpeedVal;
      // Possible combinations result in a number between 7 and 21.
      // I tried weights other than * 5, but the numbers were too close together to be useful.
      // Since val.speed is most iportant, we'll see that any overallVals number under 12 will possibly be too slow.
      // Check possible combination comment
      return SMF(overallVals < 12, overallVals >= 12 && overallVals < 17);
    }
    return speed || null;
  };

  if (navigator) {
    if (!navigator.onLine) {
      return Promise.resolve(false);
    } else {
      return measureConnectionSpeed().then(mbps => {
        const type = con && con.effectiveType ? etMap[con.effectiveType] : null;
        const downlink =
          con && con.downlink
            ? SMF(con.downlink < 4, con.downlink >= 4 && con.downlink < 7)
            : null;
        const speed = mbps ? SMF(mbps < 3, mbps >= 3 && mbps < 6) : null;
        return {
          type,
          downlink,
          speed,
          weightedAverage: calcValues(type, downlink, speed),
        };
      });
    }
  }
}
``````