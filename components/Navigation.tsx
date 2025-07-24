'use client'

import { useState } from 'react'

interface NavigationProps {
  currentView: string
  onViewChange: (view: string) => void
  profileMode: 'public' | 'private'
  onToggleMode: () => void
}

export default function Navigation({ currentView, onViewChange, profileMode, onToggleMode }: NavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { id: 'feed', icon: '🔥', label: 'VibePost', color: 'text-red-400' },
    { id: 'camera', icon: '📸', label: 'Circle Lens', color: 'text-purple-400' },
    { id: 'chat', icon: '👻', label: 'Ghost Chat', color: 'text-green-400' },
    { id: 'shop', icon: '🛍️', label: 'VibeShop', color: 'text-yellow-400' },
    { id: 'profile', icon: '🎭', label: 'Profile', color: 'text-blue-400' },
  ]

  return (
    <nav className="fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 z-50 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🐉</div>
          {!isCollapsed && (
            <div>
              <div className="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Circle X
              </div>
              <div className="text-xs text-gray-400">Beast Mode</div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Mode Toggle */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={onToggleMode}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
            profileMode === 'private' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 beast-glow' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <span className="text-xl">{profileMode === 'private' ? '🌙' : '☀️'}</span>
          {!isCollapsed && (
            <div className="text-left">
              <div className="font-semibold text-sm">
                {profileMode === 'private' ? 'Private Mode' : 'Public Mode'}
              </div>
              <div className="text-xs text-gray-400">
                {profileMode === 'private' ? 'Ghost Active' : 'Open Profile'}
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
              currentView === item.id
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 glow-primary'
                : 'hover:bg-gray-800'
            }`}
          >
            <span className={`text-xl ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>
    </nav>
  )
}
