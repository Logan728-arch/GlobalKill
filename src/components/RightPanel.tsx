import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { Card, Layer } from '../models/types';

export default function RightPanel() {
  const { selectedLayerId, setSelectedLayerId, getCurrentCard, updateLayerText } = useAppStore();

  const currentCard = getCurrentCard();

  if (!currentCard) {
    return (
      <div
        style={{
          width: '280px',
          backgroundColor: '#1e1e2e',
          borderLeft: '1px solid #3a3a4a',
          padding: '16px',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        <span style={{ fontSize: '13px' }}>请先选择一个卡牌</span>
      </div>
    );
  }

  const editableLayers = currentCard.layers.filter(l => l.editable && l.visible);

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: '#1e1e2e',
        borderLeft: '1px solid #3a3a4a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: '0 0 40%', borderBottom: '1px solid #3a3a4a', overflow: 'auto' }}>
        <div style={{ padding: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
            可编辑元素
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {editableLayers.map((layer: Layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: selectedLayerId === layer.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: selectedLayerId === layer.id ? '1px solid #3b82f6' : '1px solid transparent',
                }}
              >
                <span style={{ fontSize: '18px' }}>
                  {layer.type === 'image' ? '🖼️' : layer.vertical ? '📜' : '✏️'}
                </span>
                <span style={{ flex: 1, color: '#fff' }}>
                  {layer.name}
                </span>
                {layer.type === 'text' && (
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                    {layer.fixedStyle ? '锁定样式' : ''}
                  </span>
                )}
              </div>
            ))}
            {editableLayers.length === 0 && (
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', padding: '8px' }}>
                此模板没有可编辑元素
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
          快速编辑
        </h3>
        {selectedLayerId ? (
          <QuickEditor
            card={currentCard}
            layer={currentCard.layers.find(l => l.id === selectedLayerId)!}
            onUpdateText={(text) => updateLayerText(currentCard.id, selectedLayerId, text)}
          />
        ) : (
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            点击上方元素或双击画布上的文字/图片进行编辑
          </div>
        )}

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #3a3a4a' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
            使用说明
          </h3>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
            <div>• 双击文字区域编辑文字内容</div>
            <div>• 双击人物图片替换照片</div>
            <div>• 字体颜色和大小已固定</div>
            <div>• 文字支持换行（Shift+Enter）</div>
            <div>• Ctrl + 滚轮缩放视图</div>
            <div>• 点击"导出图片"保存卡牌</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickEditor({ card, layer, onUpdateText }: { card: Card; layer: Layer; onUpdateText: (text: string) => void }) {
  const [text, setText] = useState(layer.text || '');

  useEffect(() => {
    setText(layer.text || '');
  }, [layer.id, layer.text]);

  if (layer.type === 'image') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
          图层：{layer.name}
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
          提示：双击画布中的图片区域可以上传替换图片
        </div>
        {layer.imageUrl && (
          <img
            src={layer.imageUrl}
            alt="preview"
            style={{ width: '100%', borderRadius: '6px', objectFit: 'cover', maxHeight: '150px' }}
          />
        )}
        <ImageUploadButton cardId={card.id} layerId={layer.id} />
      </div>
    );
  }

  if (layer.type === 'text') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
          {layer.name}
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '8px' }}>
          <span>字号: {layer.fontSize}px</span>
          <span>颜色: {layer.color}</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => onUpdateText(text)}
          style={{
            width: '100%',
            minHeight: layer.vertical ? '120px' : '80px',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #3a3a4a',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: '#fff',
            fontSize: '13px',
            resize: 'vertical',
            fontFamily: 'inherit',
            lineHeight: 1.5,
          }}
          placeholder="输入文字..."
        />
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
          提示：按 Enter 确认，或点击其他区域自动保存
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
      此元素不可编辑
    </div>
  );
}

function ImageUploadButton({ cardId, layerId }: { cardId: string; layerId: string }) {
  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          useAppStore.getState().updateLayerImage(cardId, layerId, dataUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        color: '#60a5fa',
        fontSize: '13px',
        cursor: 'pointer',
      }}
    >
      📁 选择图片上传
    </button>
  );
}
