import { useAppStore } from '../stores/useAppStore';
import { allTemplates } from '../templates/usaTemplate';

export default function Toolbar() {
  const { createProject, workspace, createCardFromTemplateId, getCurrentCard } = useAppStore();

  const handleNewProject = async () => {
    const name = prompt('请输入项目名称:');
    if (name?.trim()) {
      await createProject(name.trim());
    }
  };

  const handleTemplateCreate = async (templateId: string) => {
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;
    const name = prompt(`请输入卡牌名称 (默认: ${template.name}):`, template.name);
    await createCardFromTemplateId(templateId, name?.trim() || undefined);
  };

  const handleExport = async () => {
    const card = getCurrentCard();
    if (!card) {
      alert('请先选择一个卡牌');
      return;
    }

    const cardEl = document.querySelector('[data-card-canvas]') as HTMLElement;
    if (!cardEl) return;

    try {
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = card.canvasWidth * scale;
      canvas.height = card.canvasHeight * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(scale, scale);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, card.canvasWidth, card.canvasHeight);

      const sortedLayers = [...card.layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

      for (const layer of sortedLayers) {
        if (!layer.visible) continue;
        ctx.save();
        ctx.globalAlpha = layer.opacity / 100;

        if (layer.type === 'shape') {
          if (layer.backgroundColor && !layer.backgroundColor.includes('gradient')) {
            ctx.fillStyle = layer.backgroundColor;
            if (layer.borderWidth && layer.borderColor) {
              ctx.strokeStyle = layer.borderColor;
              ctx.lineWidth = layer.borderWidth;
            }
            const isBullet = layer.name.includes('子弹');
            const isArrow = layer.name.includes('箭头');

            if (isBullet) {
              ctx.beginPath();
              const cx = layer.x + layer.width / 2;
              ctx.moveTo(cx, layer.y);
              ctx.lineTo(layer.x + layer.width, layer.y + layer.height * 0.25);
              ctx.lineTo(layer.x + layer.width, layer.y + layer.height);
              ctx.lineTo(layer.x, layer.y + layer.height);
              ctx.lineTo(layer.x, layer.y + layer.height * 0.25);
              ctx.closePath();
              ctx.fill();
              const goldGrad = ctx.createLinearGradient(layer.x, layer.y, layer.x, layer.y + layer.height);
              goldGrad.addColorStop(0, '#b8860b');
              goldGrad.addColorStop(0.2, '#daa520');
              goldGrad.addColorStop(0.3, '#ffd700');
              goldGrad.addColorStop(0.4, '#b8860b');
              goldGrad.addColorStop(0.4, '#2d2d2d');
              goldGrad.addColorStop(1, '#1a1a1a');
              ctx.fillStyle = goldGrad;
              ctx.fill();
            } else if (isArrow) {
              ctx.beginPath();
              ctx.moveTo(layer.x, layer.y);
              ctx.lineTo(layer.x, layer.y + layer.height);
              ctx.lineTo(layer.x + layer.width, layer.y + layer.height / 2);
              ctx.closePath();
              ctx.fill();
            } else {
              ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
              if (layer.borderWidth) {
                ctx.strokeRect(layer.x, layer.y, layer.width, layer.height);
              }
            }
          } else if (layer.backgroundColor?.includes('gradient')) {
            const grad = ctx.createLinearGradient(layer.x, layer.y, layer.x, layer.y + layer.height);
            grad.addColorStop(0, '#1565c0');
            grad.addColorStop(0.3, '#0d47a1');
            grad.addColorStop(0.7, '#0a3d91');
            grad.addColorStop(1, '#1565c0');
            ctx.fillStyle = grad;
            ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
          }
        } else if (layer.type === 'image' && layer.imageUrl) {
          try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = layer.imageUrl!;
            });
            ctx.drawImage(img, layer.x, layer.y, layer.width, layer.height);
          } catch (e) {
            ctx.fillStyle = '#333';
            ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
          }
        } else if (layer.type === 'text' && layer.text) {
          ctx.fillStyle = layer.color || '#000';
          let fontStr = '';
          if (layer.fontWeight) fontStr += layer.fontWeight + ' ';
          if (layer.fontSize) fontStr += layer.fontSize + 'px ';
          if (layer.font) fontStr += layer.font.replace(/"/g, '');
          ctx.font = fontStr;
          ctx.textBaseline = 'middle';

          if (layer.vertical) {
            const chars = layer.text.split('');
            const charHeight = (layer.fontSize || 20) * (layer.lineHeight || 1.2);
            const totalHeight = chars.length * charHeight;
            const startX = layer.x + layer.width / 2;
            let startY = layer.y;
            if (layer.align === 'center') {
              startY = layer.y + (layer.height - totalHeight) / 2 + charHeight / 2;
            }
            chars.forEach((char, i) => {
              ctx.textAlign = 'center';
              ctx.fillText(char, startX, startY + i * charHeight);
            });
          } else {
            const lines = layer.text.split('\n');
            const lineHeight = (layer.fontSize || 20) * (layer.lineHeight || 1.4);
            const totalHeight = lines.length * lineHeight;
            let startY = layer.y + layer.height / 2 - totalHeight / 2 + lineHeight / 2;
            ctx.textAlign = layer.align === 'center' ? 'center' : layer.align === 'right' ? 'right' : 'left';
            let x = layer.x;
            if (layer.align === 'center') x = layer.x + layer.width / 2;
            else if (layer.align === 'right') x = layer.x + layer.width;
            else x = layer.x + 4;
            lines.forEach((line, i) => {
              ctx.fillText(line, x, startY + i * lineHeight);
            });
          }
        }
        ctx.restore();
      }

      const link = document.createElement('a');
      link.download = `${card.name || 'card'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export failed:', e);
      alert('导出功能需要用html2canvas，正在使用简化导出模式');
    }
  };

  return (
    <div
      style={{
        height: '48px',
        backgroundColor: '#1e1e2e',
        borderBottom: '1px solid #3a3a4a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff', marginRight: '16px' }}>
        🃏 全球杀卡牌编辑器
      </span>

      <div style={{ width: '1px', height: '24px', backgroundColor: '#3a3a4a' }} />

      <button onClick={handleNewProject} style={btnStyle}>
        <span>+</span> 新建项目
      </button>

      {workspace?.currentProjectId && (
        <>
          <div style={{ display: 'flex', gap: '4px' }}>
            {allTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => handleTemplateCreate(template.id)}
                style={{ ...btnStyle, backgroundColor: '#2563eb', borderColor: '#3b82f6', color: '#fff' }}
              >
                + {template.name}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#3a3a4a' }} />

          <button onClick={handleExport} style={{ ...btnStyle, backgroundColor: '#059669', borderColor: '#10b981', color: '#fff' }}>
            📥 导出图片
          </button>
        </>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 12px',
  border: '1px solid #4a4a5a',
  borderRadius: '6px',
  backgroundColor: '#2a2a3a',
  color: '#e5e7eb',
  fontSize: '13px',
  cursor: 'pointer',
  transition: 'all 0.15s',
};
