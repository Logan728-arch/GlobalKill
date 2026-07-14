import { useRef, useState, useCallback, useEffect } from 'react';

interface DialogBox {
  id: number;
  text: string;
}

const CARD_WIDTH = 400;
const CARD_HEIGHT = 560;

export default function CardEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sleeveInputRef = useRef<HTMLInputElement>(null);
  const baseInputRef = useRef<HTMLInputElement>(null);

  const [sleeveImage, setSleeveImage] = useState<HTMLImageElement | null>(null);
  const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
  const [cardName, setCardName] = useState('');
  const [dialogs, setDialogs] = useState<DialogBox[]>([
    { id: 0, text: '' },
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
  ]);
  const [sleeveUrl, setSleeveUrl] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  const loadImage = useCallback((url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }, []);

  const handleSleeveUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    loadImage(url).then((img) => {
      setSleeveImage(img);
      setSleeveUrl(url);
    });
  };

  const handleBaseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    loadImage(url).then((img) => {
      setBaseImage(img);
      setBaseUrl(url);
    });
  };

  const updateDialog = (id: number, text: string) => {
    setDialogs((prev) => prev.map((d) => (d.id === id ? { ...d, text } : d)));
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CARD_WIDTH * dpr;
    canvas.height = CARD_HEIGHT * dpr;
    canvas.style.width = `${CARD_WIDTH}px`;
    canvas.style.height = `${CARD_HEIGHT}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    // Layer 0: Base image (bottom layer, left-bottom aligned)
    if (baseImage) {
      const scale = CARD_WIDTH / baseImage.width;
      const dw = baseImage.width * scale;
      const dh = baseImage.height * scale;
      ctx.drawImage(baseImage, 0, CARD_HEIGHT - dh, dw, dh);
    }

    // Layer 1: Sleeve image (top layer, covers card area)
    if (sleeveImage) {
      ctx.drawImage(sleeveImage, 0, 0, CARD_WIDTH, CARD_HEIGHT);
    } else {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(1, 1, CARD_WIDTH - 2, CARD_HEIGHT - 2);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(59,130,246,0.04)';
      ctx.fillRect(1, 1, CARD_WIDTH - 2, CARD_HEIGHT - 2);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('点击"上传卡套"加载图片', CARD_WIDTH / 2, CARD_HEIGHT / 2 - 10);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#bbb';
      ctx.fillText('上传卡底作为背景图', CARD_WIDTH / 2, CARD_HEIGHT / 2 + 14);
    }

    // Layer 2: Card name text (drawn on the card in the bottom area)
    // The actual input is placed below the canvas per user request
    if (cardName) {
      ctx.save();
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(0,0,0,0.7)';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      const nx = 60;
      const ny = CARD_HEIGHT - 20;
      ctx.strokeText(cardName, nx, ny);
      ctx.fillText(cardName, nx, ny);
      ctx.restore();
    }

    // Layer 3: 4 dialog boxes (2 columns x 2 rows) at bottom-left of sleeve content area
    // Left blue border takes ~80px, so content area starts around x=80
    const dlgW = 140;
    const dlgH = 38;
    const dlgGapX = 12;
    const dlgGapY = 8;
    const dlgStartX = 85;
    const dlgStartY = CARD_HEIGHT - 30 - (dlgH * 2 + dlgGapY) - 30;

    ctx.save();
    dialogs.forEach((dlg, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = dlgStartX + col * (dlgW + dlgGapX);
      const y = dlgStartY + row * (dlgH + dlgGapY);

      if (dlg.text) {
        drawArrowBox(ctx, x, y, dlgW, dlgH);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const maxW = dlgW - 28;
        ctx.fillText(truncateText(ctx, dlg.text, maxW), x + (dlgW - 18) / 2, y + dlgH / 2);
      }
    });
    ctx.restore();
  }, [sleeveImage, baseImage, cardName, dialogs]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cardName || 'card'}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#1a1a2e' }}>
      {/* Top Toolbar */}
      <div style={toolbarStyle}>
        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#e0e0e0', marginRight: '16px' }}>
          GlobalKill 卡牌编辑器
        </span>
        <div style={{ width: 1, height: 22, background: '#333', margin: '0 10px' }} />

        <button onClick={() => sleeveInputRef.current?.click()} style={btnStyle}>
          上传卡套
        </button>
        <input ref={sleeveInputRef} type="file" accept="image/*" onChange={handleSleeveUpload} style={{ display: 'none' }} />

        <button onClick={() => baseInputRef.current?.click()} style={btnStyle}>
          上传卡底
        </button>
        <input ref={baseInputRef} type="file" accept="image/*" onChange={handleBaseUpload} style={{ display: 'none' }} />

        <div style={{ width: 1, height: 22, background: '#333', margin: '0 10px' }} />

        <button onClick={handleExport} style={{ ...btnStyle, background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }}>
          导出图片
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel */}
        <div style={leftPanelStyle}>
          <div style={sectionTitleStyle}>图层说明</div>
          <div style={{ fontSize: 12, color: '#999', lineHeight: 1.8, marginBottom: 16 }}>
            <div style={{ color: '#00c8ff' }}>▣ 卡套（最顶层）</div>
            <div style={{ paddingLeft: 12 }}>居中显示，可替换</div>
            <div style={{ color: '#22c55e', marginTop: 4 }}>▣ 卡底（最底层）</div>
            <div style={{ paddingLeft: 12 }}>左下方对齐卡套</div>
          </div>

          <div style={sectionTitleStyle}>技能对话框（4个，两列平行）</div>
          {dialogs.map((dlg, i) => (
            <div key={dlg.id} style={formGroupStyle}>
              <label style={labelStyle}>技能 {i + 1}</label>
              <input
                type="text"
                value={dlg.text}
                onChange={(e) => updateDialog(dlg.id, e.target.value)}
                style={inputStyle}
                placeholder={`输入技能${i + 1}名称`}
              />
            </div>
          ))}

          <div style={{ ...sectionTitleStyle, marginTop: 20 }}>状态</div>
          <div style={{ fontSize: 12, color: '#888', lineHeight: 2 }}>
            卡套：{sleeveUrl ? <span style={{ color: '#22c55e' }}>已加载</span> : <span style={{ color: '#ef4444' }}>未上传</span>}<br />
            卡底：{baseUrl ? <span style={{ color: '#22c55e' }}>已加载</span> : <span style={{ color: '#ef4444' }}>未上传</span>}<br />
            尺寸：{CARD_WIDTH} × {CARD_HEIGHT} px
          </div>
        </div>

        {/* Canvas Preview Area */}
        <div style={canvasAreaStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Canvas */}
            <div
              style={{
                position: 'relative',
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <canvas ref={canvasRef} style={{ display: 'block' }} />
            </div>

            {/* Text input below canvas, left-aligned */}
            <div style={{ marginTop: 10, width: CARD_WIDTH }}>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>卡牌名称</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={{
                  width: 200,
                  padding: '8px 12px',
                  border: '1px solid #3a3a5a',
                  borderRadius: 6,
                  background: '#1e1e3a',
                  color: '#e0e0e0',
                  fontSize: 14,
                  outline: 'none',
                }}
                placeholder="输入卡牌名称"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawArrowBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const aw = 16;
  const r = 3;

  ctx.save();
  ctx.shadowColor = 'rgba(0, 200, 255, 0.4)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, 'rgba(10, 40, 80, 0.88)');
  grad.addColorStop(1, 'rgba(5, 25, 55, 0.92)');
  ctx.fillStyle = grad;
  ctx.strokeStyle = '#00c8ff';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - aw, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w - aw, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner highlight line
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + r + 2, y + 2);
  ctx.lineTo(x + w - aw - 2, y + 2);
  ctx.stroke();

  ctx.restore();
}

function truncateText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let result = text;
  while (ctx.measureText(result + '…').width > maxWidth && result.length > 0) {
    result = result.slice(0, -1);
  }
  return result + '…';
}

const toolbarStyle: React.CSSProperties = {
  height: 48,
  background: '#16162a',
  borderBottom: '1px solid #2a2a4a',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  gap: 6,
  flexShrink: 0,
};

const btnStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: '1px solid #3a3a5a',
  borderRadius: 6,
  background: '#1e1e3a',
  color: '#ccc',
  fontSize: 13,
  cursor: 'pointer',
  transition: 'all 0.15s',
};

const leftPanelStyle: React.CSSProperties = {
  width: 240,
  background: '#16162a',
  borderRight: '1px solid #2a2a4a',
  padding: 16,
  overflowY: 'auto',
  flexShrink: 0,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: 1,
  marginBottom: 10,
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: 10,
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: '#999',
  marginBottom: 3,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  border: '1px solid #2d2d4a',
  borderRadius: 5,
  background: '#1a1a30',
  color: '#ddd',
  fontSize: 13,
  outline: 'none',
};

const canvasAreaStyle: React.CSSProperties = {
  flex: 1,
  background: '#0d0d1a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
  padding: 30,
};
