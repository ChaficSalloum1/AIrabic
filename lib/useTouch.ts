
import { useEffect, useRef, useState } from 'react';

interface TouchState {
  startX: number;
  startY: number;
  moveX: number;
  moveY: number;
}

export const useTouch = (threshold = 50) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const touchState = useRef<TouchState>({ startX: 0, startY: 0, moveX: 0, moveY: 0 });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchState.current.startX = e.touches[0].clientX;
      touchState.current.startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchState.current.moveX = e.touches[0].clientX;
      touchState.current.moveY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = touchState.current.moveX - touchState.current.startX;
      const deltaY = touchState.current.moveY - touchState.current.startY;

      if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < threshold * 0.5) {
        setSwipeDirection(deltaX > 0 ? 'right' : 'left');
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold]);

  return { swipeDirection };
};
