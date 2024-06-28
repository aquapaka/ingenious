import { RangeTuple } from 'fuse.js';
import { ReactElement } from 'react';

// Recursively builds JSX output adding `<mark>` tags around matches
export default function HighlightText({
  text,
  highlightIndices = [],
  i = 1,
}: {
  text: string;
  highlightIndices: readonly RangeTuple[];
  i?: number;
}): ReactElement {
  const indicePair = highlightIndices[highlightIndices.length - i];

  return !indicePair ? (
    <>{text}</>
  ) : (
    <>
      <HighlightText text={text.substring(0, indicePair[0])} highlightIndices={highlightIndices} i={i + 1} />
      <mark>{text.substring(indicePair[0], indicePair[1] + 1)}</mark>
      {text.substring(indicePair[1] + 1)}
    </>
  );
}
