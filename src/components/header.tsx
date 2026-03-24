import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Bell, Search, } from "lucide-react"
interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl flex font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              <p className="text-cyan-600">Todo</p>Pro
            </h1>
          </div>

          <div className="relative w-96 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}