import { useRef } from 'react';
import { useAppStore } from '../stores/useAppStore';
import CardCanvas from './CardCanvas';

export default function CanvasArea() {
  const { zoom, setZoom, getCurrentCard } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCard = getCurrentCard();

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -5 : 5;
      setZoom(Math.max(20, Math.min(150, zoom + delta)));
    }
  };

  const handleZoomIn = () => setZoom(Math.min(150, zoom + 10));
  const handleZoomOut = () => setZoom(Math.max(20, zoom - 10));
  const handleZoomReset = () => setZoom(60);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        backgroundColor: '#2a2a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        position: 'relative',
        backgroundImage: 'radial-gradient(circle, #3a3a4a 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
      onWheel={handleWheel}
    >
      <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 100 }}>
        <button onClick={handleZoomOut} style={zoomBtnStyle}>−</button>
        <span style={{ color: '#fff', fontSize: '13px', minWidth: '50px', textAlign: 'center', lineHeight: '28px' }}>
          {zoom}%
        </span>
        <button onClick={handleZoomIn} style={zoomBtnStyle}>+</button>
        <button onClick={handleZoomReset} style={zoomBtnStyle}>重置</button>
      </div>

      <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
        双击文字可编辑 · 双击人物图片可替换 · Ctrl+滚轮缩放
      </div>

      {currentCard ? (
        <div style={{ padding: '40px' }}>
          <CardCanvas card={currentCard} zoom={zoom} />
        </div>
      ) : (
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '48px' }}>🃏</div>
          <div style={{ marginBottom: '8px', fontWeight: 500 }}>选择或创建一个卡牌开始编辑</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>从工具栏选择模板创建新卡牌</div>
        </div>
      )}
    </div>
  );
}

const zoomBtnStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '4px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
};
