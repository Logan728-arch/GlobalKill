import { useAppStore } from '../stores/useAppStore';

export default function StatusBar() {
  const { zoom, getCurrentProject, getCurrentCard } = useAppStore();

  const currentProject = getCurrentProject();
  const currentCard = getCurrentCard();

  return (
    <div
      style={{
        height: '28px',
        backgroundColor: '#161622',
        borderTop: '1px solid #3a3a4a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '20px',
        flexShrink: 0,
        fontSize: '12px',
        color: 'rgba(255,255,255,0.5)',
      }}
    >
      <span>
        项目: <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{currentProject?.name || '无'}</strong>
      </span>
      <span>
        卡牌: <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{currentCard?.name || '无'}</strong>
      </span>
      <span>缩放: {zoom}%</span>
      <span>图层: {currentCard?.layers.length || 0}</span>
      <span style={{ marginLeft: 'auto', opacity: 0.7 }}>全球杀卡牌编辑器 v1.0</span>
    </div>
  );
}
