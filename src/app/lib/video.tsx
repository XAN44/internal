import React from "react";

interface Props {
  title: string;
  url: string;
  chapter: number;
}

export function Video({ title, url, chapter }: Props) {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="sm:text-xl xsm:text-xs font-bold mb-3">{title}:</h3>
        <h3 className="sm:text-xl font-bold mb-3 xsm:text-xs text-blue-600">
          Chapter {chapter}
        </h3>
      </div>
      <video width="1400" height="1800" controls preload="none">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
