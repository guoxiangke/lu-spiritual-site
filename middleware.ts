import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 这个中间件将处理CORS问题
export function middleware(request: NextRequest) {
  // 只处理API请求
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // 克隆响应头
    const requestHeaders = new Headers(request.headers)

    // 添加CORS头
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // 添加CORS头到响应
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  }

  // 对于其他请求，不做任何处理
  return NextResponse.next()
}

// 配置中间件匹配的路径
export const config = {
  matcher: ["/api/:path*"],
}
