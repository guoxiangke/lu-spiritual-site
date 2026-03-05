import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 尝试访问新的外部API
    const response = await fetch("https://r2.savefamily.net/lu-nt-2025.json", {
      method: "HEAD",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      // 设置超时
      signal: AbortSignal.timeout(2000), // 2秒超时
    })

    // 返回API状态
    return NextResponse.json({
      status: response.ok ? "online" : "offline",
      source: "external_api",
      statusCode: response.status,
      url: "https://r2.savefamily.net/lu-nt-2025.json",
    })
  } catch (error) {
    // 捕获错误并返回离线状态
    console.error("API状态检查失败:", error)
    return NextResponse.json({
      status: "offline",
      source: "external_api",
      url: "https://r2.savefamily.net/lu-nt-2025.json",
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
