'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import VibePost from '@/components/VibePost'

export default function Home() {
  const [currentView, setCurrentView] = useState('feed')
  const [profileMode, setProfileMode] = useState<'public' | 'private'>('public')

  const toggleProfileMode = () => {
    setProfileMode(prev => prev === 'public' ? 'private' : 'public')
  }

  const renderView = () => {
    switch (currentView) {
      case 'feed':
        return <VibePost />
      case 'camera':
        return (
          <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              📸 Circle Lens
            </h1>
            <p className="text-gray-400 mb-8">Beast Camera with emotion filters coming soon...</p>
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-12 border border-gray-700">
              <div className="text-6xl mb-4">🚧</div>
              <p className="text-xl">Under Construction</p>
            </div>
          </div>
        )
      case 'chat':
        return (
          <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-4">
              👻 Ghost Chat
            </h1>
            <p className="text-gray-400 mb-8">Auto-delete messages & secret chats coming soon...</p>
            <div className="bg-gradient-to-r from-green-900 to-teal-900 rounded-2xl p-12 border border-gray-700">
              <div className="text-6xl mb-4">👻</div>
              <p className="text-xl">Phantom Mode</p>
            </div>
          </div>
        )
      case 'shop':
        return (
          <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
              🛍️ VibeShop
            </h1>
            <p className="text-gray-400 mb-8">Built-in marketplace for creators coming soon...</p>
            <div className="bg-gradient-to-r from-yellow-900 to-orange-900 rounded-2xl p-12 border border-gray-700">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl">Market Mode</p>
            </div>
          </div>
        )
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              🎭 X-Profile
            </h1>
            <p className="text-gray-400 mb-8">
              Currently in {profileMode} mode
            </p>
            <div className={`bg-gradient-to-r ${profileMode === 'private' ? 'from-purple-900 to-pink-900' : 'from-blue-900 to-cyan-900'} rounded-2xl p-12 border border-gray-700`}>
              <div className="text-6xl mb-4">{profileMode === 'private' ? '🌙' : '☀️'}</div>
              <p className="text-xl">{profileMode === 'private' ? 'Ghost Mode Active' : 'Public Profile'}</p>
            </div>
          </div>
        )
      default:
        return <VibePost />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        profileMode={profileMode}
        onToggleMode={toggleProfileMode}
      />
      <main className="ml-64 min-h-screen">
        {renderView()}
      </main>
    </div>
  )
}
