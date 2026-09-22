import { useState, useCallback } from 'react'

let _id = 0

export default function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ type = 'info', message, duration = 4000 }) => {
    const id = ++_id
    setToasts((prev) => [...prev, { id, type, message, duration }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = {
    success: (message, opts) => addToast({ type: 'success', message, ...opts }),
    error:   (message, opts) => addToast({ type: 'error',   message, ...opts }),
    warning: (message, opts) => addToast({ type: 'warning', message, ...opts }),
    info:    (message, opts) => addToast({ type: 'info',    message, ...opts }),
  }

  return { toasts, removeToast, toast }
}
