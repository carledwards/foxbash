import { useEffect, useRef, useState } from 'react'
import './App.css'

interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 2, y: 1 }) // Start with a small offset
  const [size, setSize] = useState<Size>({ width: 40, height: 15 }) // In character units
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [initialPos, setInitialPos] = useState<Position>({ x: 0, y: 0 })
  const [initialSize, setInitialSize] = useState<Size>({ width: 0, height: 0 })

  // Convert pixel coordinates to character grid coordinates
  const toCharPos = (pixelX: number, pixelY: number): Position => {
    const charWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--char-width'))
    const charHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--char-height'))
    return {
      x: Math.floor(pixelX / charWidth),
      y: Math.floor(pixelY / charHeight)
    }
  }

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    if (e.button !== 0) return // Only handle left click
    e.preventDefault()

    const charPos = toCharPos(e.clientX, e.clientY)
    setDragStart(charPos)
    
    if (action === 'drag') {
      setIsDragging(true)
      setInitialPos(position)
    } else {
      setIsResizing(true)
      setInitialSize(size)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return

    const charPos = toCharPos(e.clientX, e.clientY)
    const deltaX = charPos.x - dragStart.x
    const deltaY = charPos.y - dragStart.y

    if (isDragging) {
      // Update position with grid snapping
      setPosition({
        x: Math.max(0, Math.min(initialPos.x + deltaX, 80 - size.width)),
        y: Math.max(0, Math.min(initialPos.y + deltaY, 25 - size.height))
      })
    } else if (isResizing) {
      // Update size with minimum constraints
      setSize({
        width: Math.max(15, Math.min(initialSize.width + deltaX, 80)),
        height: Math.max(5, Math.min(initialSize.height + deltaY, 25))
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mouseup', handleMouseUp)
      return () => window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing])

  const windowStyle = {
    left: `calc(${position.x} * var(--char-width))`,
    top: `calc(${position.y} * var(--char-height))`,
    width: `calc(${size.width} * var(--char-width))`,
    height: `calc(${size.height} * var(--char-height))`,
  }

  return (
    <div 
      className={`dos-screen ${isDragging ? 'dragging' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="window active"
        style={windowStyle}
      >
        <div 
          className="title-bar"
          onMouseDown={(e) => handleMouseDown(e, 'drag')}
        >
          <span className="close-button">■</span>
          <span className="title">FoxBash Terminal</span>
          <span className="maximize-button">≡</span>
        </div>
        <div className="window-content">
          <pre>Welcome to FoxBash
Type 'help' for commands
Ready...</pre>
          <div 
            className="resize-handle"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
          />
        </div>
      </div>
    </div>
  )
}

export default App
