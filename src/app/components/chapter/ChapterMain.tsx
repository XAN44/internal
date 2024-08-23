import React from "react";
import { Video } from "../../lib/video";

interface Props {
  title: string;
  url: string;
  chapter: number;
}

function ChapterMain({ title, url, chapter }: Props) {
  return (
    <div>
      <Video title={title} url={url} chapter={chapter} />
    </div>
  );
}

export default ChapterMain;
