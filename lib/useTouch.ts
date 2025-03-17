
import { useEffect, useRef, useState } from 'react';

interface TouchState {
  startX: number;
  startY: number;
  moveX: number;
  moveY: number;
  isDragging: boolean;
}

interface DragItem {
  id: string;
  order: number;
}

export const useTouch = (threshold = 50) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    isDragging: false
  });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchState.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        moveX: e.touches[0].clientX,
        moveY: e.touches[0].clientY,
        isDragging: false
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      touchState.current.moveX = e.touches[0].clientX;
      touchState.current.moveY = e.touches[0].clientY;

      const deltaX = touchState.current.moveX - touchState.current.startX;
      const deltaY = touchState.current.moveY - touchState.current.startY;

      // Start dragging if vertical movement is detected on draggable items
      if (target.getAttribute('data-draggable') && Math.abs(deltaY) > threshold / 2) {
        touchState.current.isDragging = true;
        const itemId = target.getAttribute('data-id') || '';
        const order = parseInt(target.getAttribute('data-order') || '0');
        setDraggedItem({ id: itemId, order });
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      const deltaX = touchState.current.moveX - touchState.current.startX;
      const deltaY = touchState.current.moveY - touchState.current.startY;

      // Handle horizontal swipe
      if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < threshold * 0.5) {
        setSwipeDirection(deltaX > 0 ? 'right' : 'left');
      }

      // Reset dragging state
      if (touchState.current.isDragging) {
        touchState.current.isDragging = false;
        setDraggedItem(null);
      }

      // Reset swipe direction after animation frame
      requestAnimationFrame(() => {
        setSwipeDirection(null);
      });
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold]);

  return {
    swipeDirection,
    draggedItem,
    isDragging: touchState.current.isDragging
  };
};
