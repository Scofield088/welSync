'use client'

import React, { useEffect, useRef } from 'react'

const WaveformAnimation = ({ isListening }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let time = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Draw waveform
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      
      for (let x = 0; x < canvas.width; x++) {
        const frequency = isListening ? 0.02 : 0.01
        const amplitude = isListening ? 50 : 20
        
        const y = Math.sin(x * frequency + time) * amplitude + canvas.height / 2
        ctx.lineTo(x, y)
      }
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, '#60a5fa')    // blue-400
      gradient.addColorStop(0.5, '#e879f9')  // purple-400
      gradient.addColorStop(1, '#60a5fa')    // blue-400
      
      ctx.strokeStyle = gradient
      ctx.lineWidth = 4
      ctx.stroke()
      
      time += 0.05
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isListening])
  
  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-32"
    />
  )
}

export default WaveformAnimation

