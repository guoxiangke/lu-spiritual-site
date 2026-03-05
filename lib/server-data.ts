import { DevotionalItems } from "@/lib/get-devotional-items"

// 仅在服务器端使用的数据获取函数
export async function getDevotionalDataFromFile(): Promise<DevotionalItems> {
  try {
    console.log("从本地JSON文件获取数据")
    
    const { readFileSync } = await import('fs')
    const { join } = await import('path')
    
    const filePath = join(process.cwd(), 'lu-nt-2025.json')
    const fileContent = readFileSync(filePath, 'utf8')
    const jsonData = JSON.parse(fileContent)
    
    // 将数组格式转换为对象格式
    const devotionalData: DevotionalItems = {}
    
    jsonData.forEach((item: any) => {
      // 从标题中提取日期（前4个字符，如"0101"）
      const dateKey = item.标题.substring(0, 4)
      devotionalData[dateKey] = {
        title: item.标题,
        vid: item.vid,
      }
    })
    
    console.log("成功从本地文件获取数据")
    return devotionalData
  } catch (error) {
    console.error("从本地文件获取数据失败:", error)
    throw error
  }
}