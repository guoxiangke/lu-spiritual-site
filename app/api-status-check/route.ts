import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 检查本地JSON文件是否存在
    const fs = await import('fs')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'lu-nt-2025.json')
    
    // 检查文件是否存在和可读
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      return NextResponse.json({
        status: "online",
        source: "local_file",
        fileSize: stats.size,
        lastModified: stats.mtime.toISOString(),
      })
    } else {
      return NextResponse.json({
        status: "offline",
        source: "local_file",
        error: "本地数据文件不存在",
      })
    }
  } catch (error) {
    // 捕获错误并返回离线状态
    console.error("数据源状态检查失败:", error)
    return NextResponse.json({
      status: "offline",
      source: "local_file",
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
