import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { YearCalendar } from "@/components/year-calendar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 22v-5" />
              <path d="M9 7V2" />
              <path d="M15 7V2" />
              <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z" />
              <path d="M9 17v-4" />
              <path d="M15 17v-4" />
            </svg>
            <h1 className="text-xl font-bold">灵修小站</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-foreground hover:text-primary">
              首页
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container py-10">
        <h2 className="mb-16 text-center text-3xl font-medium">2025卢牧师带你读新约</h2>
        <YearCalendar />
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>灵修小站 &copy; {new Date().getFullYear()} - 2025卢牧师带你读新约</p>
        </div>
      </footer>
    </div>
  )
}
