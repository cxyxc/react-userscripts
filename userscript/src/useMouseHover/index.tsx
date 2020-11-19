import {useCallback, useEffect, useRef} from "react"

// 鼠标移入事件全局监听 - 带有延时
export const useMouseHover = ({
    timeout = 300,
    callback,
    nodeNames = ['IMG'] // 监听的 node 种类
}: {
    timeout?: number,
    callback: (node: any) => void,
    nodeNames?: Array<string>
}) => {
    // 鼠标移入移出事件监听
    const nodeMouseOver = useRef<any>()
    const nodeMouseOverTimer = useRef<any>()

    const mouseOverListener = useCallback(
        (e: any) => {
            const node = e.target
            if(!nodeNames.includes(node?.nodeName)) return

            nodeMouseOver.current = node
            nodeMouseOverTimer.current = setTimeout(() => {
                callback(node)
            }, timeout);    
        },
        [timeout, callback, nodeNames],
      )

    const mouseOutListener = useCallback(
        () => {
            nodeMouseOver.current = null;
            clearTimeout(nodeMouseOverTimer.current)
        },
        [],
    )

    useEffect(() => {
        window.addEventListener('mouseover', mouseOverListener)
        window.addEventListener('mouseout', mouseOutListener)
        return () => {
          window.removeEventListener('mouseover', mouseOverListener)
          window.removeEventListener('mouseout', mouseOutListener)
        }
      }, [mouseOverListener, mouseOutListener]) 
}