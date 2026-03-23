import { useState } from "react"
import { Button } from "./ui/button"
import { Home, Settings, BarChart3, Menu, X, ClipboardList, History, Calendar1 } from "lucide-react"
import { cn } from "../lib/utils"
import { useNavigate } from "react-router-dom"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}
export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    { id: "dashboard", label: "DashBoard", icon: ClipboardList, },
    { id: "taskview", label: "All Tasks", icon: Home},
    { id: "calendar", label: "Calendar", icon: Calendar1},
    { id: "history", label: "History", icon: History},
  ]

  return (
    <div
      className={cn(
        "bg-white/95 backdrop-blur border-r border-slate-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-100",
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-slate-900 flex"><p className="text-cyan-600">Task</p> Master Pro</h2>
              <p className="text-xs text-slate-500">Pro Dashboard</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-500 hover:text-slate-700"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item:any) => (
      <Button
        key={item.id}
        variant={activeView === item.id ? "default" : "ghost"}
        className={cn(
          "w-full",
          isCollapsed ? "justify-center" : "justify-start text-left",
          activeView === item.id
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
        )}
        onClick={() =>{
          onViewChange(item.id)
          navigate(`/${item.id}`)
        }}
      >
        <item.icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
          </>
        )}
      </Button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-900">
          <BarChart3 className={cn("w-4 h-4", isCollapsed ? "" : "mr-3")} />
          {!isCollapsed && "Analytics"}
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-900">
          <Settings className={cn("w-4 h-4", isCollapsed ? "" : "mr-3")} />
          {!isCollapsed && "Settings"}
        </Button>
      </div>
    </div>
  )
}
