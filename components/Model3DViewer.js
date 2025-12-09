'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Environment } from '@react-three/drei'
import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import STL loader to avoid SSR issues
const STLModel = dynamic(() => import('./STLModel'), { ssr: false })

export default function Model3DViewer({ modelUrl, fallbackImage }) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  if (!modelUrl || error) {
    return (
      <div className="w-full h-full bg-nerd-gray rounded-lg overflow-hidden">
        {fallbackImage ? (
          <img src={fallbackImage} alt="Product" className="w-full h-full object-contain" />
        ) : (
          <img src="/images/coming-soon.svg" alt="Coming Soon" className="w-full h-full object-contain p-8" />
        )}
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-nerd-gray rounded-lg overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-nerd-gray z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nerd-red mx-auto mb-4"></div>
            <p>Loading 3D Model...</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 150], fov: 50 }}
        style={{ background: '#242424' }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <STLModel 
              url={modelUrl} 
              onLoad={() => setLoading(false)}
              onError={() => {
                setError(true)
                setLoading(false)
              }}
            />
          </Stage>
          <Environment preset="warehouse" />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            minDistance={50}
            maxDistance={300}
          />
        </Suspense>
      </Canvas>

      {!loading && (
        <div className="absolute bottom-4 right-4 bg-nerd-dark/80 text-white text-xs px-3 py-2 rounded">
          Drag to rotate • Scroll to zoom
        </div>
      )}
    </div>
  )
}
