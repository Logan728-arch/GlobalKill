import { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import Toolbar from './components/Toolbar';
import LeftPanel from './components/LeftPanel';
import CanvasArea from './components/CanvasArea';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';

function App() {
  const { init, isLoading } = useAppStore();

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e1e2e',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
        }}
      >
        加载中...
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#1e1e2e',
      }}
    >
      <Toolbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LeftPanel />
        <CanvasArea />
        <RightPanel />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
