import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 设置超时
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒超时

    // 从指定API获取数据
    const response = await fetch("https://r2share.simai.life/luNT.json", {
      cache: "no-store", // 不使用缓存
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("获取灵修数据失败:", error)
    // 返回错误响应
    return NextResponse.json(
      { error: "获取数据失败", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
