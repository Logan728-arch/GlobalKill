import { useAppStore } from '../stores/useAppStore';
import type { Project, Card } from '../models/types';

export default function LeftPanel() {
  const { workspace, selectProject, deleteProject, selectCard, getCurrentProject } = useAppStore();

  const currentProject = getCurrentProject();

  return (
    <div
      style={{
        width: '240px',
        backgroundColor: '#1e1e2e',
        borderRight: '1px solid #3a3a4a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '12px', borderBottom: '1px solid #3a3a4a' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
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
                color: '#e5e7eb',
                backgroundColor:
                  workspace?.currentProjectId === project.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                border:
                  workspace?.currentProjectId === project.id
                    ? '1px solid #3b82f6'
                    : '1px solid transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s',
              }}
            >
              <span>📁 {project.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`确定删除项目 "${project.name}" 吗？`)) {
                    deleteProject(project.id);
                  }
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'rgba(239, 68, 68, 0.7)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {(!workspace?.projects || workspace.projects.length === 0) && (
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', padding: '8px' }}>
              暂无项目，点击上方"新建项目"
            </span>
          )}
        </div>
      </div>

      {currentProject && (
        <div style={{ padding: '12px', flex: 1, overflow: 'auto' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
            卡牌列表
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentProject.cards.map((card: Card) => (
              <div
                key={card.id}
                onClick={() => selectCard(card.id)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#e5e7eb',
                  backgroundColor:
                    workspace?.currentCardId === card.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                  border:
                    workspace?.currentCardId === card.id
                      ? '1px solid #3b82f6'
                      : '1px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🃏</span>
                  <span style={{ flex: 1 }}>{card.name}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                  {card.canvasWidth} × {card.canvasHeight}
                </div>
              </div>
            ))}
            {currentProject.cards.length === 0 && (
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', padding: '8px' }}>
                暂无卡牌，点击工具栏模板按钮创建
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
