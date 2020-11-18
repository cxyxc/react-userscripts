import React, {useCallback, useEffect} from 'react';
import * as ml5  from 'ml5';
import './App.css';

// 图片分类器
const imageClassifierReady = () => console.log('imageClassifierReady')
const imageClassifier = ml5.imageClassifier('MobileNet', imageClassifierReady)

function App() {
  const clickListener = useCallback(
    (e: any) => {
      const node = e.target
      if(node?.nodeName === "IMG") {
        // 发现图片元素
        node.crossOrigin = "*" // 设置跨域许可
        imageClassifier.classify(
          node,
          (err: any, results: any) => {
            console.log(err, results);
          }
        );
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('mouseover', clickListener)
    return () => {
      window.removeEventListener('mouseover', clickListener)
    }
  }, [clickListener])

  const onClick = () => {
    console.log('开启智能识图')
  }

  return (
    <div className="App">
      <button onClick={onClick}>开启智能识图</button>
    </div>
  );
}

export default App;
