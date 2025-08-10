import { useEffect, useState } from 'react'

let pushToast
export function toast(msg, type='info') {
  pushToast?.({ id: Math.random().toString(36).slice(2), msg, type })
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([])
  useEffect(() => {
    pushToast = (t) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3000)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[100]">
      {toasts.map(t => (
        <div key={t.id} className={`card px-4 py-3 text-sm ${t.type==='error'?'border border-red-300 bg-red-50':'border border-gray-200'}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
