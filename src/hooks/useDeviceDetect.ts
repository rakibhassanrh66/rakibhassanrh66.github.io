import { useState, useEffect } from 'react';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type OSType = 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'unknown';
export type InputType = 'mouse' | 'touch' | 'hybrid';

export interface DeviceInfo {
  deviceType: DeviceType;
  os: OSType;
  inputType: InputType;
  isPortrait: boolean;
  width: number;
  height: number;
  isLowPower: boolean;
}

export function useDeviceDetect(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    deviceType: 'desktop',
    os: 'unknown',
    inputType: 'mouse',
    isPortrait: false,
    width: 1920,
    height: 1080,
    isLowPower: false,
  });

  useEffect(() => {
    function detect(): DeviceInfo {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ua = navigator.userAgent.toLowerCase();

      // Device type
      let deviceType: DeviceType = 'desktop';
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        deviceType = 'tablet';
      } else if (
        /mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)
      ) {
        deviceType = 'mobile';
      } else if (w < 768) {
        deviceType = 'mobile';
      } else if (w < 1024) {
        deviceType = 'tablet';
      }

      // OS detection
      let os: OSType = 'unknown';
      if (/windows nt/i.test(ua)) os = 'windows';
      else if (/macintosh|mac os x/i.test(ua)) os = 'macos';
      else if (/linux/i.test(ua) && !/android/i.test(ua)) os = 'linux';
      else if (/android/i.test(ua)) os = 'android';
      else if (/iphone|ipad|ipod/i.test(ua)) os = 'ios';

      // Input type
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasMouse = matchMedia('(pointer: fine)').matches;
      let inputType: InputType = 'mouse';
      if (hasTouch && !hasMouse) inputType = 'touch';
      else if (hasTouch && hasMouse) inputType = 'hybrid';

      // Low power estimation
      const isMobile = deviceType === 'mobile';
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const isLowPower = isMobile || (memory !== undefined && memory < 4);

      return {
        deviceType,
        os,
        inputType,
        isPortrait: h > w,
        width: w,
        height: h,
        isLowPower,
      };
    }

    const update = () => setInfo(detect());
    update();

    const debounceTimer: ReturnType<typeof setTimeout>[] = [];
    const handleResize = () => {
      debounceTimer.push(setTimeout(update, 150));
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      debounceTimer.push(setTimeout(update, 300));
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', () => {});
      debounceTimer.forEach(clearTimeout);
    };
  }, []);

  return info;
}
