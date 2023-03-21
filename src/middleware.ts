import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  console.log(requestHeaders)
  requestHeaders.set('Access-Control-Allow-Origin', '*')
  console.log(1)

  requestHeaders.set('Access-Control-Allow-Methods', 'POST')
  console.log(2)

  requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type')
  console.log(3)

  requestHeaders.set('Access-Control-Allow-Credentials', 'true')
  console.log(4)

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  console.log(5)

  return response
}
