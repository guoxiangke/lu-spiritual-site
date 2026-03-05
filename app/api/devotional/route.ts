import { NextResponse } from "next/server"
import { getDevotionalDataFromFile } from "@/lib/server-data"

export const dynamic = "force-dynamic" // 确保不缓存响应

export async function GET() {
  try {
    console.log("开始从API获取数据")

    // 设置超时
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 增加到10秒超时

    // 从本地JSON文件读取数据
    const data = await getDevotionalDataFromFile()
    
    clearTimeout(timeoutId)
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
