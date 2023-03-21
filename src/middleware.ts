import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('Access-Control-Allow-Origin', '*')
  requestHeaders.set('Access-Control-Allow-Methods', 'POST')
  requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type')
  requestHeaders.set('Access-Control-Allow-Credentials', 'true')
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  console.log(response.headers)

  return response
}
