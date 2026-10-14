'use client';

import { useEffect, useRef } from 'react';

// Web-encoded (H.264, 540p, no audio) copies of the clips in /public/videos/work.
const VIDEOS = [
  'IMG_0780',
  'IMG_1077',
  'IMG_1523',
  'IMG_1894',
  'IMG_2022',
  'IMG_2163',
  'IMG_3850',
  'IMG_4008',
  'IMG_4983',
  'IMG_5028',
  'IMG_5569',
  'IMG_5755',
  'IMG_6030',
  'IMG_6192',
  'IMG_6209',
  'IMG_6828',
].map((name) => `/videos/work/web/${name}.mp4`);

// Six columns of portrait reels; neighbouring columns drift in opposite directions.
// Each column takes six clips, striding through the list from its own offset so
// neighbouring columns never show the same run of clips.
const COLUMN_COUNT = 6;
const CLIPS_PER_COLUMN = 6;
const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, col) =>
  Array.from({ length: CLIPS_PER_COLUMN }, (_, k) => VIDEOS[(col + k * COLUMN_COUNT) % VIDEOS.length])
);

// Yellowtooths-style wall of work: tall rounded cards in columns, each card a looping video.
export default function WorkReel() {
  const rootRef = useRef(null);

  // Only play clips that are on screen, so the wall doesn't decode every video at once.
  useEffect(() => {
    const videos = rootRef.current?.querySelectorAll('video');
    if (!videos?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) target.play().catch(() => {});
          else target.pause();
        });
      },
      { rootMargin: '200px 0px' }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wr-wall" ref={rootRef}>
      {COLUMNS.map((clips, col) => (
        <div key={col} className={`wr-col ${col % 2 ? 'wr-col--down' : 'wr-col--up'}`}>
          {/* Track holds the clips twice so the loop is seamless. */}
          <div className="wr-track">
            {[...clips, ...clips].map((src, i) => (
              <div key={`${src}-${i}`} className="wr-card" aria-hidden={i >= clips.length || undefined}>
                <video
                  src={src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
