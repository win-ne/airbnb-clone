import Link from 'next/link'

export const metadata = {
  title: 'Booking error',
}

export default function IncompletePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="h-8" alt="Airbnb Logo" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 mx-auto mb-8">
            <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">We couldn't complete your booking. Your card wasn't charged. You can try again or contact support if the problem persists.</p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/checkout" className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:shadow">Try again</Link>
            <a href="mailto:support@example.com" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">Contact support</a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Airbnb | <a href="#" className="hover:underline">Privacy</a> | <a href="#" className="hover:underline">Terms</a></p>
          </div>
        </div>
      </footer>
    </main>
  )
}
