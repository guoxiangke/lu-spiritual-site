import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { getDevotionalItem } from "@/lib/get-devotional-items"
import Image from "next/image"

export default async function DayPage({
  params,
}: {
  params: { day: string }
}) {
  const dateStr = params.day

  // 验证日期格式 (MMDD)
  if (!dateStr.match(/^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/)) {
    return notFound()
  }

  // 解析月份和日期
  const month = Number.parseInt(dateStr.substring(0, 2))
  const day = Number.parseInt(dateStr.substring(2, 4))

  // 获取月份名称
  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ]
  const monthName = monthNames[month - 1]

  // 检查是否是未来日期
  const now = new Date()
  const dateToCheck = new Date(now.getFullYear(), month - 1, day)
  if (dateToCheck > now) {
    // 未来日期显示特殊信息
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                返回
              </Button>
            </Link>
          </div>
        </header>
        <main className="container py-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-center text-2xl font-medium">
              2025卢牧师带你读新约 {month}月{day}日
            </h1>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <p className="text-center">未来日期的内容尚未发布，请耐心等待。</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  try {
    console.log(`开始获取${dateStr}日期的内容`)
    // 获取当天的灵修内容
    const devotionalItem = await getDevotionalItem(dateStr)
    console.log(`成功获取${dateStr}日期的内容:`, devotionalItem ? "有数据" : "无数据")

    // 如果没有找到内容
    if (!devotionalItem) {
      return (
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container flex h-16 items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  返回
                </Button>
              </Link>
            </div>
          </header>
          <main className="container py-10">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-8 text-center text-2xl font-medium">
                2025卢牧师带你读新约 {month}月{day}日
              </h1>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <p className="text-center">该日期没有灵修内容。</p>
              </div>
            </div>
          </main>
        </div>
      )
    }

    // 构建视频URL
    const videoUrl = `https://go2024.simai.life/api?redirect=https://r2.savefamily.net/@pastorpaulqiankunlu618/${devotionalItem.vid}.mp4?metric=PastorLu&keyword=webpage2&type=video&bot=26&to=webpage2`

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                返回
              </Button>
            </Link>
          </div>
        </header>
        <main className="container py-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-center text-2xl font-medium">
              2025卢牧师带你读新约 {month}月{day}日 {devotionalItem.title ? `—— ${devotionalItem.title}` : ""}
            </h1>

            {/* 视频播放器 */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <video width="100%" controls src={videoUrl} className="aspect-video w-full" />
            </div>

            {/* 返回链接 - 已经在顶部添加了，这里可以再添加一个 */}
            <div className="mb-8 text-center">
              <Link href="/" className="text-primary hover:underline">
                返回
              </Link>
            </div>

            {/* 二维码部分 */}
            <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
              <p className="mb-4 text-center">扫一扫 或 微信中 长按 下面的二维码，即可加卢牧师微信</p>
              <div className="flex justify-center">
                <Image
                  src="https://r2.savefamily.net/OVagt1.JPG"
                  alt="卢牧师微信二维码"
                  width={500}
                  height={500}
                  className="max-w-full rounded-lg"
                />
              </div>
            </div>

            {/* YouTube嵌入 */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${devotionalItem.vid}?si=zz5OCgHQvyW71w8c&amp;controls=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-video w-full"
              />
            </div>

            {/* 如果有经文，显示经文 */}
            {devotionalItem.scripture && (
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-medium">今日经文</h2>
                <p className="italic">{devotionalItem.scripture}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  } catch (error) {
    console.error(`获取${dateStr}日期内容失败:`, error)

    // 出错时显示错误页面
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                返回
              </Button>
            </Link>
          </div>
        </header>
        <main className="container py-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-center text-2xl font-medium">
              2025卢牧师带你读新约 {month}月{day}日
            </h1>
            <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="mb-4">获取内容时出错，请稍后再试。</p>
              <p className="text-sm text-muted-foreground mb-4">
                错误详情: {error instanceof Error ? error.message : String(error)}
              </p>
              <div className="mt-4 flex justify-center">
                <Link href="/">
                  <Button>返回首页</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
