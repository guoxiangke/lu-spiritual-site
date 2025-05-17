"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

export function ApiStatusIndicator() {
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline" | "unknown">("unknown")

  // 由于我们已经使用静态数据，API状态检查是可选的
  // 我们不再在组件加载时自动检查API状态

  // 手动检查API状态的函数
  const checkApiStatus = async () => {
    try {
      setApiStatus("loading")

      // 使用AbortController设置超时
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // 3秒超时

      const response = await fetch("/api-status-check", {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      setApiStatus(response.ok ? "online" : "offline")
    } catch (error) {
      console.error("API状态检查失败:", error)
      setApiStatus("offline")
    }
  }

  // 渲染状态指示器
  return (
    <div className="flex items-center gap-1 text-xs">
      {apiStatus === "unknown" && (
        <>
          <Info className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">使用本地数据</span>
        </>
      )}

      {apiStatus === "loading" && (
        <>
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          <span className="text-muted-foreground">检查中...</span>
        </>
      )}

      {apiStatus === "online" && (
        <>
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span className="text-muted-foreground">API在线</span>
        </>
      )}

      {apiStatus === "offline" && (
        <>
          <AlertCircle className="h-3 w-3 text-amber-500" />
          <span className="text-muted-foreground">API离线</span>
        </>
      )}
    </div>
  )
}
