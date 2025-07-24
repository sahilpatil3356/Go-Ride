'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    cloudinary: any
  }
}

interface CloudinaryUploadProps {
  onUploadSuccess?: (url: string) => void
}

export default function CloudinaryUpload({ onUploadSuccess }: CloudinaryUploadProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    // Load Cloudinary script
    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/global/all.js'
    script.async = true
    script.onload = () => setIsLoaded(true)
    document.body.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const openUploadWidget = () => {
    if (!isLoaded || !window.cloudinary) {
      console.error('Cloudinary widget not loaded')
      return
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: 'de0vaeyjj',
        uploadPreset: 'ml_default',
        sources: ['local', 'camera'],
        multiple: false,
        folder: 'goride_uploads',
        cropping: false,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const imageUrl = result.info.secure_url
          setPreviewUrl(imageUrl)
          console.log('Image URL:', imageUrl)
          
          // Call the callback if provided
          if (onUploadSuccess) {
            onUploadSuccess(imageUrl)
          }
        }
      }
    )
  }

  return (
    <div className="upload-widget-container">
      <button
        onClick={openUploadWidget}
        disabled={!isLoaded}
        className="upload-button bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        📤 Upload Image
      </button>
      
      {previewUrl && (
        <div className="preview-container mt-4">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="preview-image max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  )
}
