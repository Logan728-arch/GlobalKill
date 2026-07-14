import { useAppStore } from '../stores/useAppStore';

export default function Toolbar() {
  const { createProject, workspace, createCard } = useAppStore();

  const handleNewProject = async () => {
    const name = prompt('请输入项目名称:');
    if (name?.trim()) {
      await createProject(name.trim());
    }
  };

  const handleNewCard = async () => {
    const name = prompt('请输入卡牌名称:');
    if (name?.trim()) {
      await createCard(name.trim());
    }
  };

  return (
    <div
      style={{
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #D1D5DB',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1F2937', marginRight: '16px' }}>
        GlobalKill Card Editor
      </span>

      <div style={{ width: '1px', height: '24px', backgroundColor: '#D1D5DB' }} />

      <button onClick={handleNewProject} style={btnStyle}>
        <span>+</span> 新建项目
      </button>

      {workspace?.currentProjectId && (
        <button onClick={handleNewCard} style={btnStyle}>
          <span>+</span> 新建卡牌
        </button>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 12px',
  border: '1px solid #D1D5DB',
  borderRadius: '6px',
  backgroundColor: '#FFFFFF',
  color: '#1F2937',
  fontSize: '13px',
  cursor: 'pointer',
  transition: 'all 0.15s',
};
