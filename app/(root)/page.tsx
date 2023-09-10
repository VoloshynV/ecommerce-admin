'use client'

import { useEffect } from 'react'

import { useStoreModal } from '@/hooks/use-store-modal'

export default function Home() {
  const { isOpen, onClose, onOpen } = useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onClose, onOpen])

  return (
    <div className=''>
      hello
      <p>Hello Admin Dashboard</p>
    </div>
  )
}
