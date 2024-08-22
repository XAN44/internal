import React from "react";

interface Props {
  title: string;
  url: string;
}

export function Video({ title, url }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      <video width="1400" height="1800" controls preload="none">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
