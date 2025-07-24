'use client'

import { useState, useRef } from 'react'
import CloudinaryUpload from './CloudinaryUpload'

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  emotion: 'happy' | 'sad' | 'angry' | 'chill' | 'hyper'
  media?: string
  timestamp: string
  vibes: number
  comments: number
}

const emotionConfig = {
  happy: { emoji: '😊', color: 'from-yellow-400 to-orange-400', bg: 'bg-yellow-500/20' },
  sad: { emoji: '😢', color: 'from-blue-400 to-indigo-400', bg: 'bg-blue-500/20' },
  angry: { emoji: '😡', color: 'from-red-400 to-pink-400', bg: 'bg-red-500/20' },
  chill: { emoji: '😎', color: 'from-green-400 to-teal-400', bg: 'bg-green-500/20' },
  hyper: { emoji: '🤯', color: 'from-purple-400 to-pink-400', bg: 'bg-purple-500/20' }
}

export default function VibePost() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all')
  const [isCreating, setIsCreating] = useState(false)
  const [newPost, setNewPost] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Mock posts data
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'BeastModeAlex',
      avatar: '🦄',
      content: 'Just dropped the sickest track! This vibe is absolutely unmatched 🔥🔥🔥',
      emotion: 'hyper',
      timestamp: '2m ago',
      vibes: 142,
      comments: 23
    },
    {
      id: '2',
      author: 'VibeQueen_',
      avatar: '🌙',
      content: 'Late night coding session. Sometimes the best ideas come when the world sleeps...',
      emotion: 'chill',
      timestamp: '15m ago',
      vibes: 89,
      comments: 12
    },
    {
      id: '3',
      author: 'RageGamer99',
      avatar: '🔥',
      content: 'Lost my 10-hour save file. WHY DO THESE THINGS HAPPEN TO ME?!',
      emotion: 'angry',
      timestamp: '1h ago',
      vibes: 67,
      comments: 34
    }
  ])

  const filteredPosts = selectedEmotion === 'all' 
    ? posts 
    : posts.filter(post => post.emotion === selectedEmotion)

  const detectEmotion = (text: string): 'happy' | 'sad' | 'angry' | 'chill' | 'hyper' => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('rage') || text.includes('!')) {
      return 'angry'
    }
    if (lowerText.includes('sad') || lowerText.includes('cry') || lowerText.includes('depressed')) {
      return 'sad'
    }
    if (lowerText.includes('hype') || lowerText.includes('excited') || lowerText.includes('amazing') || text.includes('🔥')) {
      return 'hyper'
    }
    if (lowerText.includes('chill') || lowerText.includes('relax') || lowerText.includes('calm')) {
      return 'chill'
    }
    return 'happy'
  }

  const handlePostCreate = () => {
    if (newPost.trim()) {
      const emotion = detectEmotion(newPost)
      console.log('Creating post with emotion:', emotion)
      setNewPost('')
      setIsCreating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
          🔥 VibePost Feed
        </h1>
        <p className="text-gray-400">Emotion AI organizes your feed by vibes, not time</p>
      </div>

      {/* Post Creator */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex gap-4">
          <div className="text-2xl">🎭</div>
          <div className="flex-1">
            {!isCreating ? (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full text-left p-4 bg-gray-800 rounded-xl text-gray-400 hover:bg-gray-700 transition-colors"
              >
                Share your vibe... 🧠 AI will detect your emotion
              </button>
            ) : (
              <div className="space-y-4">
                <textarea
                  ref={textareaRef}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's your vibe right now?"
                  className="w-full p-4 bg-gray-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <CloudinaryUpload onUploadSuccess={(url) => console.log('Media uploaded:', url)} />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePostCreate}
                      className="btn-beast text-white"
                    >
                      💥 Drop Vibe
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emotion Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedEmotion('all')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
            selectedEmotion === 'all' 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          🌟 All Vibes
        </button>
        {Object.entries(emotionConfig).map(([emotion, config]) => (
          <button
            key={emotion}
            onClick={() => setSelectedEmotion(emotion)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedEmotion === emotion 
                ? `bg-gradient-to-r ${config.color} text-white` 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {config.emoji} {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const emotion = emotionConfig[post.emotion]
          return (
            <div key={post.id} className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 ${emotion.bg}`}>
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{post.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-gray-400">{post.timestamp}</div>
                </div>
                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${emotion.color} text-white text-sm font-medium`}>
                  {emotion.emoji} {post.emotion}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-white mb-4 leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-700">
                <button className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors group">
                  <span className="text-lg group-hover:scale-110 transition-transform">💥</span>
                  <span className="font-medium">{post.vibes} Felt That</span>
                </button>
                <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                  <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                  <span className="font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors group">
                  <span className="text-lg group-hover:scale-110 transition-transform">🔄</span>
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
