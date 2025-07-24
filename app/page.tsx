'use client'

import CloudinaryUpload from '@/components/CloudinaryUpload'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Circle X
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your innovative platform is ready to go!
        </p>

        <div className="upload-section">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Your Profile Picture
          </h2>
          <CloudinaryUpload
            onUploadSuccess={(url) => {
              console.log('Profile picture uploaded:', url)
              // You can handle the uploaded URL here
            }}
          />
        </div>
      </div>
    </main>
  )
}
