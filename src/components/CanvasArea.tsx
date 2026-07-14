import { useAppStore } from '../stores/useAppStore';
import type { Project, Card } from '../models/types';

export default function CanvasArea() {
  const { workspace, zoom, setZoom } = useAppStore();

  const currentProject = workspace?.projects.find(
    (p: Project) => p.id === workspace.currentProjectId
  );
  const currentCard = currentProject?.cards.find(
    (c: Card) => c.id === workspace.currentCardId
  );

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      setZoom(Math.max(10, Math.min(300, zoom + delta)));
    }
  };

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#F5F5F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
      onWheel={handleWheel}
    >
      {currentCard ? (
        <div
          style={{
            width: currentCard.canvasWidth,
            height: currentCard.canvasHeight,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#9CA3AF',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
              {currentCard.name}
            </div>
            <div>{currentCard.canvasWidth} x {currentCard.canvasHeight}</div>
            <div style={{ marginTop: '16px', fontSize: '12px' }}>
              图层数量: {currentCard.layers.length}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: '#9CA3AF', fontSize: '14px', textAlign: 'center' }}>
          <div style={{ marginBottom: '8px' }}>选择一个卡牌开始编辑</div>
          <div style={{ fontSize: '12px' }}>或创建一个新卡牌</div>
        </div>
      )}
    </div>
  );
}
