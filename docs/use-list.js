/** @import {Ref} from 'endr' */

import { useCallback, useEffect, useMemo, useState } from 'endr';

const { document, getComputedStyle, Document, ResizeObserver, window, Window } =
  globalThis;
const { body } = document;
const scrollingElement = /** @type {Element} */ (document.scrollingElement);
const viewport = /** @type {VisualViewport | Window} */ (
  window.visualViewport ?? window
);

const maxSyncUpdates = 10;
const clientSizeKeys = /** @type {const} */ ({
  x: 'clientWidth',
  y: 'clientHeight'
});
const innerSizeKeys = /** @type {const} */ ({
  x: 'innerWidth',
  y: 'innerHeight'
});
const overflowKeys = /** @type {const} */ ({ x: 'overflowX', y: 'overflowY' });
const rectEndKeys = /** @type {const} */ ({ x: 'right', y: 'bottom' });
const rectSizeKeys = /** @type {const} */ ({ x: 'width', y: 'height' });
const scrollSizeKeys = /** @type {const} */ ({
  x: 'scrollWidth',
  y: 'scrollHeight'
});
const scrollStartKeys = /** @type {const} */ ({
  x: 'scrollLeft',
  y: 'scrollTop'
});

/** @param {{ axis: 'x' | 'y'; el: HTMLElement | null }} p0 */
const getScrollParent = ({ axis, el }) => {
  while ((el &&= el.parentElement) && el !== body) {
    if (el[scrollSizeKeys[axis]] <= el[clientSizeKeys[axis]]) continue;

    const overflow = getComputedStyle(el)[overflowKeys[axis]];
    if (overflow === 'scroll' || overflow === 'auto') return el;
  }

  return document;
};

/** @typedef {'nearest' | 'start' | 'end' | 'center'} ScrollTargetAlign */

/**
 * @param {{
 *   axis?: 'x' | 'y';
 *   containerRef: Ref<HTMLElement | null>;
 *   growBuffer?: number;
 *   length: number;
 *   minIndex?: number;
 *   shrinkBuffer?: number;
 * }} p0
 */
export const useList = ({
  axis = 'y',
  containerRef,
  growBuffer = 200,
  length = 0,
  minIndex = 0,
  shrinkBuffer = growBuffer + 200
}) => {
  const update = useCallback(() => {
    if (internal.isRendering) return;

    const container = containerRef.current;
    let { end, start } = state;
    if (
      !container ||
      start === end ||
      container.children.length !== end - start
    ) {
      return internal.resolve();
    }

    const { cache, prev, scrollTarget } = internal;
    let i = state.start;
    const sizes = [];
    let rowStart;
    let columns = 1;
    for (const child of container.children) {
      const rect = child.getBoundingClientRect();
      const size = rect[rectSizeKeys[axis]];
      cache[i++] = size;
      sizes.push(size);

      const start = rect[axis];
      if (rowStart == null) rowStart = start;
      else if (start === rowStart) ++columns;
    }
    const estimatedSize = sizes.sort()[Math.floor(sizes.length / 2)];
    internal.columns = columns;

    const scrollParent = getScrollParent({ axis, el: container });
    if (scrollParent !== internal.scrollParent) {
      if (internal.scrollParent !== document) {
        internal.scrollParent?.removeEventListener('scroll', update);
      }
      if (scrollParent !== document) {
        scrollParent.addEventListener('scroll', update);
      }
      internal.scrollParent = scrollParent;
    }
    const scrollEl =
      scrollParent instanceof Document ? scrollingElement : scrollParent;
    const scrollStartKey = scrollStartKeys[axis];

    let offset = 0;
    const minMinIndex = Math.min(prev.minIndex, minIndex);
    const maxStart = Math.max(prev.start, state.start);
    for (let i = minMinIndex; i < maxStart; i += columns) {
      offset += (cache[i] ?? 0) - (prev.cache[i] ?? 0);
    }
    if (offset) scrollEl[scrollStartKey] += offset;
    internal.prev = { cache: { ...cache }, minIndex, start: state.start };

    if (internal.syncUpdateCount++ > maxSyncUpdates) return internal.resolve();

    const containerRect = container.getBoundingClientRect();
    let listStart = containerRect[axis] + state.before;
    let listEnd = containerRect[rectEndKeys[axis]] - state.after;

    const viewRect =
      scrollParent instanceof Document
        ? {
            [axis]: 0,
            [rectEndKeys[axis]]:
              viewport instanceof Window
                ? viewport[innerSizeKeys[axis]]
                : viewport[rectSizeKeys[axis]]
          }
        : scrollParent.getBoundingClientRect();
    const viewStart = viewRect[axis];
    const viewEnd = viewRect[rectEndKeys[axis]];
    const maxIndex = minIndex + length;
    for (let i = minIndex; i < maxIndex; ++i) cache[i] ??= estimatedSize;
    start -= (start - minIndex) % columns;
    const partialRow = (end - minIndex) % columns;
    if (partialRow) end += columns - partialRow;
    while (start - columns >= minIndex && listStart > viewStart - growBuffer) {
      listStart -= cache[start - columns];
      start -= columns;
    }

    while (
      start < maxIndex &&
      listStart + cache[start] <= viewStart - shrinkBuffer
    ) {
      listStart += cache[start];
      start += columns;
    }

    while (end < maxIndex && listEnd < viewEnd + growBuffer) {
      listEnd += cache[end];
      end += columns;
    }

    while (
      end - columns >= minIndex &&
      listEnd - cache[end - columns] >= viewEnd + shrinkBuffer
    ) {
      listEnd -= cache[end - columns];
      end -= columns;
    }

    const clamped = clamp({ end, start });
    if (
      clamped.after !== state.after ||
      clamped.before !== state.before ||
      clamped.end !== state.end ||
      clamped.start !== state.start
    ) {
      internal.isRendering = true;
      return setState(clamped);
    }

    if (!scrollTarget) return internal.resolve();

    let { index } = scrollTarget;
    index = Math.min(minIndex + length - 1, Math.max(index, minIndex));
    index -= (index - minIndex) % columns;
    let itemStart = 0;
    for (let i = minIndex; i < index; i += columns) itemStart += cache[i];

    const scroll = scrollEl[scrollStartKey];
    const size = cache[index];
    const containerStart = containerRect[axis];
    const startScroll =
      containerStart + scroll - viewStart + itemStart - scrollTarget.buffer;
    const endScroll =
      startScroll - (viewEnd - viewStart) + size + scrollTarget.buffer * 2;

    if (scrollTarget.align === 'nearest') {
      if (startScroll < endScroll) scrollTarget.align = 'center';
      else if (scroll > startScroll) scrollTarget.align = 'start';
      else if (scroll < endScroll) scrollTarget.align = 'end';
    }
    if (scrollTarget.align === 'start') scrollEl[scrollStartKey] = startScroll;
    else if (scrollTarget.align === 'end') scrollEl[scrollStartKey] = endScroll;
    else if (scrollTarget.align === 'center') {
      scrollEl[scrollStartKey] = (startScroll + endScroll) / 2;
    }

    if (scrollEl[scrollStartKey] === scroll) internal.resolve();
    else update();
  });

  const scrollTo = useCallback(
    /**
     * @param {{
     *   align?: ScrollTargetAlign;
     *   buffer?: number;
     *   index: number;
     * }} scrollTarget
     */
    ({ align = 'nearest', buffer = 0, index }) => {
      internal.scrollTarget = { align, buffer, index };
      update();
    }
  );

  /** @param {{ end: number; start: number }} options */
  const clamp = ({ end, start }) => {
    if (growBuffer === Infinity) {
      return {
        after: 0,
        before: 0,
        end: minIndex + length,
        scrollTo,
        start: minIndex
      };
    }

    const { cache, columns } = internal;
    const maxIndex = minIndex + length;
    start -= (start - minIndex) % columns;
    start = Math.min(maxIndex, Math.max(start, minIndex));
    const partialRow = (end - minIndex) % columns;
    if (partialRow) end += columns - partialRow;
    end = Math.min(maxIndex, Math.max(end, start));
    if (end - start <= columns) {
      if (end < maxIndex) end = Math.min(maxIndex, end + columns);
      else if (start > minIndex) start -= columns;
    }

    let before = 0;
    let after = 0;
    for (let i = minIndex; i < maxIndex; i += columns) {
      if (i < start) before += cache[i] ?? 0;
      else if (i >= end) after += cache[i] ?? 0;
    }

    return { after, before, end, scrollTo, start };
  };

  const internal = useMemo(() => ({
    cache: /** @type {{ [key: number]: number }} */ ({}),
    columns: 1,
    isRendering: false,
    observed: /** @type {HTMLElement | null} */ (null),
    observer: new ResizeObserver(update),
    prev: {
      cache: /** @type {{ [key: number]: number }} */ ({}),
      minIndex,
      start: minIndex
    },
    scrollParent: /** @type {HTMLElement | Document | null} */ (null),
    scrollTarget: /**
     * @type {{
     *   align: ScrollTargetAlign;
     *   buffer: number;
     *   index: number;
     * } | null}
     */ (null),
    syncUpdateCount: 0,
    resolve: () => {
      internal.scrollTarget = null;
      internal.syncUpdateCount = 0;
    }
  }));

  const [state, setState] = useState({
    after: 0,
    before: 0,
    end: 0,
    scrollTo,
    start: 0
  });

  useMemo(() => {
    Object.assign(state, clamp({ end: state.end, start: state.start }));
  }, [length, minIndex]);

  useEffect(() => {
    const { observed, observer } = internal;
    const container = containerRef.current;
    if (observer && observed !== container) {
      if (observed) observer.unobserve(observed);
      if (container) observer.observe(container);
      internal.observed = container;
    }

    internal.isRendering = false;
    update();
  });

  useEffect(() => {
    const { observer } = internal;
    viewport.addEventListener('resize', update);
    document.addEventListener('scroll', update);
    return () => {
      observer?.disconnect();
      viewport.removeEventListener('resize', update);
      document.removeEventListener('scroll', update);
      internal.scrollParent?.removeEventListener('scroll', update);
    };
  }, [internal, update]);

  return state;
};
