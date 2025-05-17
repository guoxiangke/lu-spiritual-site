// 灵修内容接口
export interface DevotionalItem {
  title: string
  vid: string
  content?: string
  scripture?: string
}

export type DevotionalItems = Record<string, DevotionalItem>

// 从API获取数据
async function fetchDevotionalData(): Promise<DevotionalItems> {
  try {
    // 使用我们的代理API端点
    const response = await fetch("/api/devotional", {
      cache: "no-store", // 不使用缓存
      next: { revalidate: 3600 }, // 1小时后重新验证
    })

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status}`)
    }

    const data = await response.json()

    // 检查是否有错误字段
    if (data.error) {
      throw new Error(data.message || "API返回错误")
    }

    return data
  } catch (error) {
    console.error("获取灵修数据失败:", error)
    throw error
  }
}

// 获取所有灵修内容
export async function getDevotionalItems(): Promise<DevotionalItems> {
  try {
    // 从API获取数据
    return await fetchDevotionalData()
  } catch (error) {
    console.error("处理灵修数据失败:", error)
    // 出错时返回空对象，让调用者处理
    throw error
  }
}

// 获取特定日期的灵修内容
export async function getDevotionalItem(dateStr: string): Promise<DevotionalItem | null> {
  try {
    const items = await getDevotionalItems()

    // 如果找到了特定日期的内容，返回它
    if (items[dateStr]) {
      return items[dateStr]
    }

    // 检查是否是未来日期
    const now = new Date()
    const month = Number.parseInt(dateStr.substring(0, 2))
    const day = Number.parseInt(dateStr.substring(2, 4))
    const dateToCheck = new Date(now.getFullYear(), month - 1, day)

    // 如果是未来日期，返回null（表示没有数据）
    if (dateToCheck > now) {
      return null
    }

    // 如果是过去或当前日期但没有数据，返回null
    return null
  } catch (error) {
    console.error("获取特定日期灵修内容失败:", error)
    throw error
  }
}

// 检查日期是否有灵修内容
export async function hasDevotionalContent(dateStr: string): Promise<boolean> {
  try {
    const items = await getDevotionalItems()
    return !!items[dateStr]
  } catch (error) {
    console.error("检查灵修内容可用性失败:", error)
    return false
  }
}
