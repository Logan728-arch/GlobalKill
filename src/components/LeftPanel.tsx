import { useAppStore } from '../stores/useAppStore';
import type { Project, Card } from '../models/types';

export default function LeftPanel() {
  const { workspace, selectProject, deleteProject, selectCard } = useAppStore();

  const currentProject = workspace?.projects.find(
    (p: Project) => p.id === workspace.currentProjectId
  );

  return (
    <div
      style={{
        width: '260px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #D1D5DB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Projects Section */}
      <div style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '8px' }}>
          项目列表
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {workspace?.projects.map((project: Project) => (
            <div
              key={project.id}
              onClick={() => selectProject(project.id)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#1F2937',
                backgroundColor:
                  workspace.currentProjectId === project.id ? '#EFF6FF' : 'transparent',
                border:
                  workspace.currentProjectId === project.id
                    ? '1px solid #3B82F6'
                    : '1px solid transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{project.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project.id);
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#EF4444',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '2px 6px',
                }}
              >
                删除
              </button>
            </div>
          ))}
          {(!workspace?.projects || workspace.projects.length === 0) && (
            <span style={{ fontSize: '12px', color: '#9CA3AF', padding: '8px' }}>
              暂无项目，点击上方"新建项目"
            </span>
          )}
        </div>
      </div>

      {/* Cards Section */}
      {currentProject && (
        <div style={{ padding: '12px', flex: 1, overflow: 'auto' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '8px' }}>
            卡牌列表
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentProject.cards.map((card: Card) => (
              <div
                key={card.id}
                onClick={() => selectCard(card.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#1F2937',
                  backgroundColor:
                    workspace.currentCardId === card.id ? '#EFF6FF' : 'transparent',
                  border:
                    workspace.currentCardId === card.id
                      ? '1px solid #3B82F6'
                      : '1px solid transparent',
                }}
              >
                <div>{card.name}</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                  {card.canvasWidth} x {card.canvasHeight}
                </div>
              </div>
            ))}
            {currentProject.cards.length === 0 && (
              <span style={{ fontSize: '12px', color: '#9CA3AF', padding: '8px' }}>
                暂无卡牌，点击上方"新建卡牌"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
