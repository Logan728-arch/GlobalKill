import { useAppStore } from '../stores/useAppStore';
import type { Project, Card, Layer } from '../models/types';

export default function RightPanel() {
  const { workspace, selectedLayerId, setSelectedLayerId } = useAppStore();

  const currentProject = workspace?.projects.find(
    (p: Project) => p.id === workspace.currentProjectId
  );
  const currentCard = currentProject?.cards.find(
    (c: Card) => c.id === workspace.currentCardId
  );

  if (!currentCard) {
    return (
      <div
        style={{
          width: '280px',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid #D1D5DB',
          padding: '16px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#9CA3AF' }}>请先选择一个卡牌</span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #D1D5DB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Object List */}
      <div style={{ flex: '0 0 45%', borderBottom: '1px solid #E5E7EB', overflow: 'auto' }}>
        <div style={{ padding: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '8px' }}>
            对象列表
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[...currentCard.layers].reverse().map((layer: Layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: selectedLayerId === layer.id ? '#EFF6FF' : 'transparent',
                  border:
                    selectedLayerId === layer.id ? '1px solid #3B82F6' : '1px solid transparent',
                }}
              >
                <span>{layer.type === 'image' ? '\u{1F5BC}' : '\u{1F4DD}'}</span>
                <span style={{ flex: 1, color: layer.visible ? '#1F2937' : '#9CA3AF' }}>
                  {layer.name}
                </span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                  {layer.visible ? '\u{1F441}' : '\u{1F6AB}'}
                </span>
              </div>
            ))}
            {currentCard.layers.length === 0 && (
              <span style={{ fontSize: '12px', color: '#9CA3AF', padding: '8px' }}>
                暂无图层
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Property Panel */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '8px' }}>
          属性面板
        </h3>
        {selectedLayerId ? (
          <PropertyEditor layer={currentCard.layers.find((l) => l.id === selectedLayerId)!} />
        ) : (
          <CanvasProperties card={currentCard} />
        )}
      </div>
    </div>
  );
}

function CanvasProperties({ card }: { card: Card }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PropertyRow label="画布宽度" value={`${card.canvasWidth}px`} />
      <PropertyRow label="画布高度" value={`${card.canvasHeight}px`} />
      <PropertyRow label="图层数量" value={`${card.layers.length}`} />
    </div>
  );
}

function PropertyEditor({ layer }: { layer: Layer }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PropertyRow label="名称" value={layer.name} />
      <PropertyRow label="类型" value={layer.type === 'image' ? '图片' : '文字'} />
      <PropertyRow label="X" value={`${layer.x}`} />
      <PropertyRow label="Y" value={`${layer.y}`} />
      <PropertyRow label="宽度" value={`${layer.width}`} />
      <PropertyRow label="高度" value={`${layer.height}`} />
      <PropertyRow label="旋转" value={`${layer.rotation}\u00B0`} />
      <PropertyRow label="透明度" value={`${layer.opacity}%`} />
    </div>
  );
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '12px', color: '#6B7280' }}>{label}</span>
      <span style={{ fontSize: '13px', color: '#1F2937', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
