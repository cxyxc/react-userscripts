import React, {useCallback, useEffect, useRef} from 'react';
import * as ml5  from 'ml5';
import './App.css';
import {useKbn} from './useKbn';

// live2d 模型地址
const live2dUrl = 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'

// 图片分类器
const imageClassifierReady = () => console.log('imageClassifierReady')
const imageClassifier = ml5.imageClassifier('MobileNet', imageClassifierReady)

interface imageResult {
  confidence: number;
  label: string;
}

function App() {
  // 加载 live2d 模型
  const { element, say } = useKbn(live2dUrl);

  // 鼠标移入移出事件监听
  const nodeMouseOverId = useRef()
  const nodeMouseOverTimer = useRef()

  const mouseOverListener = useCallback(
    (e: any) => {
      const node = e.target
      if(node?.nodeName === "IMG") {
        // 发现图片元素
        node.crossOrigin = "*" // 设置跨域许可
        imageClassifier.classify(
          node,
          (err: any, results: Array<imageResult>) => {
            if(results?.length > 0) {
              results = results.sort(
                (a: imageResult, b: imageResult) => (b.confidence - a.confidence)
              )
              const maxResult = results[0]
              let confidenceText = '';
              if(maxResult.confidence <= 0.3) confidenceText = 'may be'
              if(maxResult.confidence > 0.3 && maxResult.confidence <= 0.7) confidenceText = 'probably'
              if(maxResult.confidence > 0.7) confidenceText = 'must be'
              say(`I think it ${confidenceText} ${maxResult.label}`)
            }
          }
        );
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('mouseover', mouseOverListener)
    window.addEventListener('mouseout', mouseOverListener)
    return () => {
      window.removeEventListener('mouseover', mouseOverListener)
      window.removeEventListener('mouseout', mouseOverListener)
    }
  }, [])

  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
