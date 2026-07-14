import { useAppStore } from '../stores/useAppStore';
import type { Project, Card } from '../models/types';

export default function StatusBar() {
  const { workspace, zoom } = useAppStore();

  const currentProject = workspace?.projects.find(
    (p: Project) => p.id === workspace.currentProjectId
  );
  const currentCard = currentProject?.cards.find(
    (c: Card) => c.id === workspace.currentCardId
  );

  return (
    <div
      style={{
        height: '28px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #D1D5DB',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '20px',
        flexShrink: 0,
        fontSize: '12px',
        color: '#6B7280',
      }}
    >
      <span>
        项目: <strong style={{ color: '#1F2937' }}>{currentProject?.name || '无'}</strong>
      </span>
      <span>
        卡牌: <strong style={{ color: '#1F2937' }}>{currentCard?.name || '无'}</strong>
      </span>
      <span>缩放: {zoom}%</span>
      <span>对象: {currentCard?.layers.length || 0}</span>
    </div>
  );
}
