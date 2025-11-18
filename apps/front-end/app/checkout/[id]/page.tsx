'use client'

import CheckoutForm from '@/components/checkout-form'
import { useParams, useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()

  const checkIn = searchParams.get('checkIn') || (new Date()).toISOString().split('T')[0]
  const checkOut = searchParams.get('checkOut') || (new Date((new Date()).getTime() + 86400000)).toISOString().split('T')[0]
  const guestCount = searchParams.get('guestCount') || '1'

  return (
    <CheckoutForm {...{ id, guestCount, checkIn, checkOut }} />
  )
}