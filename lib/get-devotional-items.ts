// 灵修内容接口
export interface DevotionalItem {
  title: string
  vid: string
  content?: string
  scripture?: string
}

export type DevotionalItems = Record<string, DevotionalItem>

// 备用数据，当API请求失败时使用
const fallbackData: DevotionalItems = {
  "0101": {
    title: "新年的祝福",
    vid: "dQw4w9WgXcQ",
  },
  "0102": {
    title: "信心的开始",
    vid: "9bZkp7q19f0",
  },
  "0103": {
    title: "每日的恩典",
    vid: "M7FIvfx5J10",
  },
  "0501": {
    title: "劳动节的思考",
    vid: "dQw4w9WgXcQ",
  },
}

// 直接从源获取数据
async function fetchDirectFromSource(): Promise<DevotionalItems> {
  try {
    console.log("尝试直接从源获取数据")
    const response = await fetch("https://r2share.simai.life/luNT.json", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Vercel Client)",
      },
      next: { revalidate: 3600 }, // 1小时后重新验证
    })

    if (!response.ok) {
      throw new Error(`直接源API响应错误: ${response.status}`)
    }

    const data = await response.json()
    console.log("成功直接从源获取数据")
    return data
  } catch (error) {
    console.error("直接从源获取数据失败:", error)
    throw error
  }
}

// 从API获取数据
async function fetchDevotionalData(): Promise<DevotionalItems> {
  try {
    console.log("尝试从代理API获取数据")
    // 使用我们的代理API端点
    const response = await fetch("/api/devotional", {
      cache: "no-store", // 不使用缓存
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`代理API响应错误: ${response.status}`)
    }

    const data = await response.json()

    // 检查是否有错误字段
    if (data.error) {
      throw new Error(data.message || "API返回错误")
    }

    console.log("成功从代理API获取数据")
    return data
  } catch (error) {
    console.error("从代理API获取数据失败:", error)

    // 尝试直接从源获取
    try {
      return await fetchDirectFromSource()
    } catch (directError) {
      console.error("所有获取方法都失败，使用备用数据")
      return fallbackData
    }
  }
}

// 获取所有灵修内容
export async function getDevotionalItems(): Promise<DevotionalItems> {
  try {
    // 从API获取数据
    const allItems = await fetchDevotionalData()

    // 获取当前日期（UTC+8）
    const now = new Date()
    const utcTime = now.getTime()
    const localTimezoneOffset = now.getTimezoneOffset()
    const utc8TimezoneOffset = -480
    const offsetMillis = (localTimezoneOffset - utc8TimezoneOffset) * 60 * 1000
    const utc8Time = utcTime + offsetMillis
    const utc8Now = new Date(utc8Time)

    // 创建当前日期的MMDD格式
    const currentMonth = utc8Now.getMonth() + 1
    const currentDay = utc8Now.getDate()
    const currentMMDD = `${currentMonth.toString().padStart(2, "0")}${currentDay.toString().padStart(2, "0")}`

    // 过滤出当前日期及之前的内容
    const filteredItems: DevotionalItems = {}

    for (const [dateStr, item] of Object.entries(allItems)) {
      // 比较日期字符串，只保留小于等于当前日期的内容
      if (dateStr <= currentMMDD) {
        filteredItems[dateStr] = item
      }
    }

    console.log(`过滤后的内容数量: ${Object.keys(filteredItems).length}，当前日期: ${currentMMDD}`)
    return filteredItems
  } catch (error) {
    console.error("处理灵修数据失败:", error)
    // 出错时返回备用数据
    return fallbackData
  }
}

// 获取特定日期的灵修内容
export async function getDevotionalItem(dateStr: string): Promise<DevotionalItem | null> {
  try {
    // 获取当前日期（UTC+8）
    const now = new Date()
    const utcTime = now.getTime()
    const localTimezoneOffset = now.getTimezoneOffset()
    const utc8TimezoneOffset = -480
    const offsetMillis = (localTimezoneOffset - utc8TimezoneOffset) * 60 * 1000
    const utc8Time = utcTime + offsetMillis
    const utc8Now = new Date(utc8Time)

    // 创建当前日期的MMDD格式
    const currentMonth = utc8Now.getMonth() + 1
    const currentDay = utc8Now.getDate()
    const currentMMDD = `${currentMonth.toString().padStart(2, "0")}${currentDay.toString().padStart(2, "0")}`

    // 如果请求的日期大于当前日期，返回null
    if (dateStr > currentMMDD) {
      console.log(`请求的日期 ${dateStr} 大于当前日期 ${currentMMDD}，返回null`)
      return null
    }

    const items = await getDevotionalItems()

    // 如果找到了特定日期的内容，返回它
    if (items[dateStr]) {
      return items[dateStr]
    }

    // 解析月份和日期
    const month = Number.parseInt(dateStr.substring(0, 2))
    const day = Number.parseInt(dateStr.substring(2, 4))

    // 如果是过去或当前日期但没有数据，返回备用数据
    if (fallbackData[dateStr]) {
      return fallbackData[dateStr]
    }

    // 如果备用数据中也没有，返回一个通用的备用内容
    return {
      title: `${month}月${day}日灵修内容`,
      vid: "dQw4w9WgXcQ", // 默认视频ID
    }
  } catch (error) {
    console.error("获取特定日期灵修内容失败:", error)

    // 尝试从备用数据中获取
    if (fallbackData[dateStr]) {
      return fallbackData[dateStr]
    }

    // 解析月份和日期
    const month = Number.parseInt(dateStr.substring(0, 2))
    const day = Number.parseInt(dateStr.substring(2, 4))

    // 返回一个基本的默认内容
    return {
      title: `${month}月${day}日灵修内容`,
      vid: "dQw4w9WgXcQ",
    }
  }
}

// 检查日期是否有灵修内容
export async function hasDevotionalContent(dateStr: string): Promise<boolean> {
  try {
    // 获取当前日期（UTC+8）
    const now = new Date()
    const utcTime = now.getTime()
    const localTimezoneOffset = now.getTimezoneOffset()
    const utc8TimezoneOffset = -480
    const offsetMillis = (localTimezoneOffset - utc8TimezoneOffset) * 60 * 1000
    const utc8Time = utcTime + offsetMillis
    const utc8Now = new Date(utc8Time)

    // 创建当前日期的MMDD格式
    const currentMonth = utc8Now.getMonth() + 1
    const currentDay = utc8Now.getDate()
    const currentMMDD = `${currentMonth.toString().padStart(2, "0")}${currentDay.toString().padStart(2, "0")}`

    // 如果请求的日期大于当前日期，返回false
    if (dateStr > currentMMDD) {
      return false
    }

    const items = await getDevotionalItems()
    return !!items[dateStr]
  } catch (error) {
    console.error("检查灵修内容可用性失败:", error)
    // 如果出错，检查备用数据
    return !!fallbackData[dateStr]
  }
}
