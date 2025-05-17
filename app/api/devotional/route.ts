import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // 确保不缓存响应

export async function GET() {
  try {
    console.log("开始从API获取数据")

    // 设置超时
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 增加到10秒超时

    // 从指定API获取数据
    const response = await fetch("https://r2share.simai.life/luNT.json", {
      cache: "no-store", // 不使用缓存
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Vercel Serverless Function)",
      },
    })

    clearTimeout(timeoutId)

    console.log("API响应状态:", response.status)

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("成功获取API数据")

    // 返回数据时添加CORS头
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    console.error("获取灵修数据失败:", error)

    // 返回更详细的错误信息
    return NextResponse.json(
      {
        error: "获取数据失败",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  }
}
