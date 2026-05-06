import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';

interface InfiniteScrollProps extends HTMLAttributes<HTMLDivElement> {
  load: () => Promise<void> | void;
  hasMore: boolean;
  loader?: ReactNode;
  isLoading?: boolean;
  children?: ReactNode;
  endMessage?: ReactNode;
}

export const InfiniteScroll = ({
  load,
  hasMore,
  isLoading = false,
  loader,
  children,
  endMessage,
  ...props
}: InfiniteScrollProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        load();
      }
    },
    [hasMore, isLoading, load],
  );

  useEffect(() => {
    if (!rootRef.current || !sentinelRef.current) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: rootRef.current,
      rootMargin: '0px',
      threshold: 0.1,
    });

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersect]);

  return (
    <div {...props} ref={rootRef}>
      {children}
      <div ref={sentinelRef}>{isLoading ? loader : !hasMore && endMessage}</div>
    </div>
  );
};
