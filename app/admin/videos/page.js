'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../../components/ProtectedRoute'
import { getAllVideos, deleteVideo, createVideo, updateVideo, extractYouTubeId } from '../../../lib/videos'

function VideosContent() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    duration: '',
    order: 0,
  })

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      const videosList = await getAllVideos()
      setVideos(videosList)
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Extract YouTube ID from URL
    const youtubeId = extractYouTubeId(formData.youtubeUrl)
    if (!youtubeId) {
      alert('Invalid YouTube URL. Please enter a valid YouTube video URL.')
      return
    }

    try {
      if (editingVideo) {
        await updateVideo(editingVideo.id, {
          ...formData,
          youtubeId,
        })
        alert('Video updated successfully!')
      } else {
        await createVideo({
          ...formData,
          youtubeId,
        })
        alert('Video added successfully!')
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        youtubeUrl: '',
        duration: '',
        order: videos.length,
      })
      setShowForm(false)
      setEditingVideo(null)
      await loadVideos()
    } catch (error) {
      console.error('Error saving video:', error)
      alert('Failed to save video: ' + error.message)
    }
  }

  const handleEdit = (video) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      duration: video.duration,
      order: video.order || 0,
    })
    setShowForm(true)
  }

  const handleDelete = async (videoId, videoTitle) => {
    if (!confirm(`Are you sure you want to delete "${videoTitle}"? This cannot be undone.`)) {
      return
    }

    try {
      await deleteVideo(videoId)
      alert('Video deleted successfully')
      await loadVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Failed to delete video: ' + error.message)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingVideo(null)
    setFormData({
      title: '',
      description: '',
      youtubeUrl: '',
      duration: '',
      order: videos.length,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
          <p className="text-gray-400">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nerd-dark">
      {/* Header */}
      <div className="bg-nerd-gray border-b border-nerd-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-white">Manage Videos</h1>
              <p className="text-gray-400 mt-1">Add and manage how-to videos for your customers</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-nerd-red hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition"
            >
              {showForm ? 'Cancel' : '+ Add Video'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Video Form */}
        {showForm && (
          <div className="bg-nerd-gray rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingVideo ? 'Edit Video' : 'Add New Video'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-nerd-dark border border-nerd-light-gray rounded text-white"
                  placeholder="e.g., Wheel Adapter Installation"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-nerd-dark border border-nerd-light-gray rounded text-white"
                  rows="3"
                  placeholder="Brief description of what the video covers..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  YouTube URL *
                </label>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-nerd-dark border border-nerd-light-gray rounded text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=abc123)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-nerd-dark border border-nerd-light-gray rounded text-white"
                    placeholder="e.g., ~8 minutes"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-nerd-dark border border-nerd-light-gray rounded text-white"
                    placeholder="0"
                  />
                  <p className="text-gray-400 text-sm mt-1">Lower numbers appear first</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-nerd-red hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition"
                >
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-nerd-light-gray hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Videos List */}
        {videos.length === 0 ? (
          <div className="bg-nerd-gray rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No videos yet</h3>
            <p className="text-gray-400 mb-4">Add your first how-to video to help customers with installation and troubleshooting</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-nerd-red hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition"
            >
              Add Your First Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-nerd-gray rounded-lg overflow-hidden">
                <div className="aspect-video bg-nerd-light-gray">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                  {video.duration && (
                    <p className="text-gray-500 text-sm mb-3">{video.duration}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(video)}
                      className="flex-1 bg-nerd-light-gray hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video.id, video.title)}
                      className="flex-1 bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminVideosPage() {
  return (
    <ProtectedRoute>
      <VideosContent />
    </ProtectedRoute>
  )
}
