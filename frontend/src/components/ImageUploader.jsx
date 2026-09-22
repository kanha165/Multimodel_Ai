import { Upload, X, ImageIcon, AlertCircle } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { ACCEPTED_TYPES, createImagePreview, revokeImagePreview, validateImage } from '../utils/helpers'

export default function ImageUploader({ onImageSelect, image, preview, onClear }) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleFile = useCallback((file) => {
    const err = validateImage(file)
    if (err) { setError(err); return }
    setError(null)
    const url = createImagePreview(file)
    onImageSelect(file, url)
  }, [onImageSelect])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true) }
  const onDragLeave = () => setDragOver(false)

  const onChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const handleClear = () => {
    revokeImagePreview(preview)
    setError(null)
    onClear()
  }

  if (preview) {
    return (
      <div className="relative group rounded-2xl overflow-hidden border border-[#2a2a3a] bg-[#16161f]">
        <img
          src={preview}
          alt="Selected"
          className="w-full max-h-80 object-contain"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            <ImageIcon size={16} />
            Change
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium transition-colors"
          >
            <X size={16} />
            Remove
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          className="hidden"
          onChange={onChange}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-4
          rounded-2xl border-2 border-dashed p-10 cursor-pointer
          transition-all duration-200 select-none
          ${dragOver
            ? 'border-blue-500 bg-blue-500/5'
            : 'border-[#2a2a3a] hover:border-blue-500/50 bg-[#16161f] hover:bg-[#1a1a26]'
          }
        `}
      >
        <div className={`p-4 rounded-2xl transition-colors ${dragOver ? 'bg-blue-500/20' : 'bg-[#1e1e2a]'}`}>
          <Upload size={32} className={dragOver ? 'text-blue-400' : 'text-[#64748b]'} />
        </div>
        <div className="text-center">
          <p className="text-[#f1f5f9] font-medium">
            {dragOver ? 'Drop image here' : 'Drag & drop your image'}
          </p>
          <p className="text-[#64748b] text-sm mt-1">
            or <span className="text-blue-400 hover:text-blue-300">browse to upload</span>
          </p>
        </div>
        <p className="text-[#64748b] text-xs">JPG, PNG, WEBP · Max 10 MB</p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          className="hidden"
          onChange={onChange}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm px-1">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  )
}
