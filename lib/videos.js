// Video management utilities
import { db } from './firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'

export async function createVideo(videoData) {
  try {
    const videosRef = collection(db, 'videos')
    const video = {
      ...videoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(videosRef, video)
    return { id: docRef.id, ...video }
  } catch (error) {
    console.error('Error creating video:', error)
    throw error
  }
}

export async function updateVideo(videoId, videoData) {
  try {
    const videoRef = doc(db, 'videos', videoId)
    await updateDoc(videoRef, {
      ...videoData,
      updatedAt: new Date().toISOString(),
    })
    return true
  } catch (error) {
    console.error('Error updating video:', error)
    throw error
  }
}

export async function deleteVideo(videoId) {
  try {
    await deleteDoc(doc(db, 'videos', videoId))
    return true
  } catch (error) {
    console.error('Error deleting video:', error)
    throw error
  }
}

export async function getVideo(videoId) {
  try {
    const videoRef = doc(db, 'videos', videoId)
    const videoSnap = await getDoc(videoRef)

    if (videoSnap.exists()) {
      return { id: videoSnap.id, ...videoSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting video:', error)
    throw error
  }
}

export async function getAllVideos() {
  try {
    const videosRef = collection(db, 'videos')
    const q = query(videosRef, orderBy('order', 'asc'))
    const snapshot = await getDocs(q)

    const videos = []
    snapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() })
    })

    return videos
  } catch (error) {
    console.error('Error getting videos:', error)
    throw error
  }
}

// Extract YouTube video ID from URL
export function extractYouTubeId(url) {
  if (!url) return null

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}
