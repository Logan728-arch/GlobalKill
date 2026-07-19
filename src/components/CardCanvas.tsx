import { useRef, useState, useEffect } from 'react';
import type { Layer, Card } from '../models/types';
import { useAppStore } from '../stores/useAppStore';

interface CardCanvasProps {
  card: Card;
  zoom: number;
}

export default function CardCanvas({ card, zoom }: CardCanvasProps) {
  const { selectedLayerId, setSelectedLayerId, editingLayerId, setEditingLayerId, updateLayerText } = useAppStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeImageLayerId, setActiveImageLayerId] = useState<string | null>(null);

  useEffect(() => {
    if (editingLayerId && inputRef.current) {
      const layer = card.layers.find(l => l.id === editingLayerId);
      if (layer?.type === 'text') {
        setEditValue(layer.text || '');
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 50);
      }
    }
  }, [editingLayerId, card.layers]);

  const sortedLayers = [...card.layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  const handleLayerClick = (e: React.MouseEvent, layer: Layer) => {
    e.stopPropagation();
    if (layer.locked) return;
    setSelectedLayerId(layer.id);
  };

  const handleLayerDoubleClick = (e: React.MouseEvent, layer: Layer) => {
    e.stopPropagation();
    if (layer.locked || !layer.editable) return;
    if (layer.type === 'text') {
      setEditingLayerId(layer.id);
    } else if (layer.type === 'image') {
      setActiveImageLayerId(layer.id);
      fileInputRef.current?.click();
    }
  };

  const handleCanvasClick = () => {
    setSelectedLayerId(null);
    if (editingLayerId) {
      finishEditing();
    }
  };

  const finishEditing = () => {
    if (editingLayerId) {
      updateLayerText(card.id, editingLayerId, editValue);
      setEditingLayerId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditingLayerId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeImageLayerId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        useAppStore.getState().updateLayerImage(card.id, activeImageLayerId, dataUrl);
        setActiveImageLayerId(null);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      data-card-canvas
      style={{
        width: card.canvasWidth,
        height: card.canvasHeight,
        position: 'relative',
        backgroundColor: '#0a1628',
        boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'center center',
        overflow: 'hidden',
        flexShrink: 0,
        borderRadius: '2px',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      {sortedLayers.map((layer) => {
        if (!layer.visible) return null;
        const isSelected = selectedLayerId === layer.id;
        const isEditing = editingLayerId === layer.id;

        return (
          <div
            key={layer.id}
            onClick={(e) => handleLayerClick(e, layer)}
            onDoubleClick={(e) => handleLayerDoubleClick(e, layer)}
            style={{
              position: 'absolute',
              left: layer.x,
              top: layer.y,
              width: layer.width,
              height: layer.height,
              opacity: layer.opacity / 100,
              transform: `rotate(${layer.rotation}deg)`,
              cursor: layer.locked ? 'default' : (layer.editable ? 'pointer' : 'default'),
              outline: isSelected && !layer.locked ? '2px solid #3b82f6' : 'none',
              outlineOffset: '2px',
              zIndex: layer.zIndex || 0,
              overflow: 'hidden',
            }}
          >
            <LayerContent layer={layer} isEditing={isEditing} />
            {isEditing && layer.type === 'text' && (
              <textarea
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={finishEditing}
                onKeyDown={handleKeyDown}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '2px solid #3b82f6',
                  borderRadius: '4px',
                  padding: '4px',
                  font: layer.font || 'inherit',
                  fontSize: layer.fontSize,
                  fontWeight: layer.fontWeight as any,
                  color: layer.color,
                  textAlign: layer.align,
                  lineHeight: layer.lineHeight,
                  letterSpacing: layer.letterSpacing,
                  writingMode: layer.vertical ? 'vertical-rl' : 'horizontal-tb',
                  resize: 'none',
                  outline: 'none',
                  zIndex: 100,
                  fontFamily: getFontFamily(layer.font),
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function getFontFamily(font?: string): string {
  if (!font) return 'inherit';
  return font.replace(/"([^"]+)"/g, '$1');
}

function LayerContent({ layer, isEditing }: { layer: Layer; isEditing: boolean }) {
  if (isEditing && layer.type === 'text') {
    return null;
  }

  switch (layer.type) {
    case 'shape':
      return <ShapeLayer layer={layer} />;
    case 'image':
      return <ImageLayer layer={layer} />;
    case 'text':
      return <TextLayer layer={layer} />;
    default:
      return null;
  }
}

function ShapeLayer({ layer }: { layer: Layer }) {
  const isGradient = layer.backgroundColor?.includes('gradient');
  const isBullet = layer.backgroundColor === 'bullet' || layer.name.includes('子弹');
  const isArrow = layer.name.includes('箭头');
  const isVignette = layer.name.includes('暗角');

  if (isBullet) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '30%',
            background: 'linear-gradient(180deg, #ffd700 0%, #daa520 40%, #b8860b 60%, #8b6914 100%)',
            borderRadius: '50% 50% 20% 20%',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: 0,
            width: '100%',
            height: '14%',
            background: 'linear-gradient(180deg, #b8860b 0%, #8b6914 50%, #654321 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '8%',
            width: '84%',
            height: '3%',
            background: '#4a3000',
            borderRadius: '1px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: 0,
            width: '100%',
            height: '58%',
            background: 'linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)',
            borderRadius: '0 0 3px 3px',
            boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.1)',
          }}
        />
      </div>
    );
  }

  if (isArrow) {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: `${layer.height / 2}px 0 ${layer.height / 2}px ${layer.width}px`,
          borderColor: `transparent transparent transparent ${layer.backgroundColor}`,
          filter: 'drop-shadow(1px 0 2px rgba(0,0,0,0.3))',
        }}
      />
    );
  }

  if (isVignette) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: layer.backgroundColor,
          pointerEvents: 'none',
        }}
      />
    );
  }

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: isGradient ? undefined : layer.backgroundColor,
    background: isGradient ? layer.backgroundColor : undefined,
    borderRadius: typeof layer.borderRadius === 'number' ? layer.borderRadius : undefined,
    border: layer.borderWidth ? `${layer.borderWidth}px solid ${layer.borderColor}` : undefined,
    boxShadow: layer.borderColor ? `inset 0 0 8px ${layer.borderColor}40` : undefined,
    position: 'relative',
  };

  if (layer.name.includes('按钮框')) {
    return (
      <div
        style={{
          ...style,
          background: 'linear-gradient(180deg, #37474f 0%, #263238 50%, #1e282d 100%)',
        }}
      />
    );
  }

  if (layer.name.includes('分隔线')) {
    return (
      <div
        style={{
          ...style,
          boxShadow: `0 0 8px ${layer.backgroundColor}80`,
        }}
      />
    );
  }

  return <div style={style} />;
}

function ImageLayer({ layer }: { layer: Layer }) {
  if (!layer.imageUrl) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a2e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '16px',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: '48px' }}>🖼️</div>
        <div>双击上传人物图片</div>
      </div>
    );
  }

  return (
    <img
      src={layer.imageUrl}
      alt={layer.name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 20%',
        display: 'block',
      }}
      draggable={false}
    />
  );
}

function TextLayer({ layer }: { layer: Layer }) {
  const isFactionChar = layer.name === '势力字';

  const style: React.CSSProperties = {
    margin: 0,
    padding: 0,
    fontFamily: getFontFamily(layer.font),
    fontSize: layer.fontSize,
    fontWeight: layer.fontWeight as any,
    color: layer.color,
    textAlign: layer.align,
    lineHeight: layer.lineHeight,
    letterSpacing: layer.letterSpacing,
    writingMode: layer.vertical ? 'vertical-rl' : 'horizontal-tb',
    textOrientation: layer.vertical ? 'upright' : 'mixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: layer.vertical ? 'flex-start' : 'center',
    justifyContent: getJustifyContent(layer.align),
    whiteSpace: layer.vertical ? 'normal' : 'pre-wrap',
    wordBreak: 'break-word',
    userSelect: 'none',
    textShadow: isFactionChar
      ? '3px 3px 6px rgba(0,0,0,0.6), 0 0 20px rgba(129, 212, 250, 0.3)'
      : layer.name === '姓名'
      ? '2px 2px 4px rgba(0,0,0,0.5)'
      : layer.name.includes('技能') && layer.name.includes('名称')
      ? '1px 1px 2px rgba(0,0,0,0.8)'
      : undefined,
  };

  return <div style={style}>{layer.text}</div>;
}

function getJustifyContent(align?: string): string {
  switch (align) {
    case 'center': return 'center';
    case 'right': return 'flex-end';
    default: return 'flex-start';
  }
}
