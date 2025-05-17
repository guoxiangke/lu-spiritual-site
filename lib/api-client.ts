// 创建一个新的API客户端文件，使用代理API端点

import type { DevotionalItems } from "./get-devotional-items"

// 从代理API获取数据
export async function fetchFromProxyApi(): Promise<DevotionalItems> {
  try {
    const response = await fetch("/api/devotional", {
      cache: "no-store", // 不使用缓存
    })

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("通过代理获取灵修数据失败:", error)
    throw error
  }
}
