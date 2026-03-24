import { Bell } from "lucide-react"
import type { Notification } from "../../types/notification"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import NotificationsItem from "./notificationsItem"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"
interface NotificationListProps {
    notifications: Notification[]
}
export default function NotificationList({ notifications }: NotificationListProps) {
    const [isMobile, setIsMobile] = useState(false)
    const unreadNotifications = notifications.filter((notification) => !notification.read)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    return (
        <Popover >
            <PopoverTrigger className="cursor-pointer">
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && <div className={cn("absolute  w-2 h-2 rounded-full bg-red-500", isMobile ? "top-1 left-15" : "top-7 right-37")}></div>}
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-slate-50">
                <ScrollArea className="h-80 w-full rounded-md border p-2">

                    {notifications.length === 0 ? (
                        <p className="text-center text-slate-400">No notifications</p>
                    ) : (
                        notifications.map((notification) => (
                            <div key={notification.id}>
                                <NotificationsItem notification={notification} />
                                <Separator className="my-2" />
                            </div>
                        ))
                    )}
                </ScrollArea>

            </PopoverContent>
        </Popover>
    )
}