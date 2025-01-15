"use client";

export const InfiniteScroller = ({ texts = [] }: { texts?: string[] }) => {
  if (!texts.length) return null;

  return (
    <div className="relative flex overflow-x-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {texts.map((text, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
        {texts.map((text, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
    </div>
  );
};