'use client'

import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function STLModel({ url, onLoad, onError }) {
  const fileExtension = url.split('.').pop().toLowerCase()
  
  let geometry
  try {
    if (fileExtension === 'stl') {
      geometry = useLoader(STLLoader, url)
    } else if (fileExtension === 'obj') {
      const obj = useLoader(OBJLoader, url)
      geometry = obj.children[0]?.geometry
    } else {
      throw new Error('Unsupported file format')
    }
  } catch (error) {
    if (onError) onError(error)
    return null
  }

  useEffect(() => {
    if (geometry && onLoad) {
      onLoad()
    }
  }, [geometry, onLoad])

  if (!geometry) return null

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#dc2626" 
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}
