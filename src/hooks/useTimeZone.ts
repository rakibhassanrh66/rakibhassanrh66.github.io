import { useState, useEffect } from 'react';

interface TimeZoneInfo {
  visitorTime: string;
  visitorDate: string;
  visitorTimezone: string;
  visitorRegion: string;
  myTime: string;
  myDate: string;
  timeDiff: string;
}

export function useTimeZone(): TimeZoneInfo {
  const [info, setInfo] = useState<TimeZoneInfo>({
    visitorTime: '--:--',
    visitorDate: '---',
    visitorTimezone: 'Detecting...',
    visitorRegion: 'Detecting...',
    myTime: '--:--',
    myDate: '---',
    timeDiff: '--',
  });

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const formatTime = (d: Date, tzName: string) =>
      d.toLocaleTimeString('en-US', { timeZone: tzName, hour: '2-digit', minute: '2-digit', hour12: true });
    const formatDate = (d: Date, tzName: string) =>
      d.toLocaleDateString('en-US', { timeZone: tzName, weekday: 'short', month: 'short', day: 'numeric' });

    // Bangladesh time
    const bdTime = formatTime(now, 'Asia/Dhaka');
    const bdDate = formatDate(now, 'Asia/Dhaka');

    // Visitor time
    const vTime = formatTime(now, tz);
    const vDate = formatDate(now, tz);

    // Time difference
    const bdOffset = getOffset(now, 'Asia/Dhaka');
    const vOffset = getOffset(now, tz);
    const diffHours = Math.round((bdOffset - vOffset) / 60);
    const diffStr =
      diffHours === 0 ? 'Same time' : diffHours > 0 ? `${diffHours}h ahead` : `${Math.abs(diffHours)}h behind`;

    // Region approximation
    const region = tz.includes('/') ? tz.split('/')[1]?.replace(/_/g, ' ') : tz;

    setInfo({
      visitorTime: vTime,
      visitorDate: vDate,
      visitorTimezone: tz,
      visitorRegion: region,
      myTime: bdTime,
      myDate: bdDate,
      timeDiff: diffStr,
    });
  }, []);

  return info;
}

function getOffset(date: Date, tz: string): number {
  const parts = date.toLocaleString('en-US', { timeZone: tz, hour12: false }).split(/[/, :]/);
  if (parts.length < 5) return 0;
  const localDate = new Date(
    parseInt(parts[2]),
    parseInt(parts[0]) - 1,
    parseInt(parts[1]),
    parseInt(parts[3]),
    parseInt(parts[4])
  );
  return localDate.getTimezoneOffset();
}
