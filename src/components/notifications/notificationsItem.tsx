import { useEffect, useState } from "react"
import { updateNotification } from "../../features/todo/services/notificationService"
import type { Notification } from "../../types/notification"
import { Item, ItemContent, ItemHeader, ItemTitle } from "../ui/item"
interface NotificationsItemProps {
    notification: Notification
}
export default function NotificationsItem({ notification }: NotificationsItemProps) {
    const [read, setRead] = useState(notification.read)
    const onCheckNotice = () => {
        notification.read = true
        setRead(true)
        updateNotification({
            ...notification,
            read: true,
        })
    }
    useEffect(() => {
        onCheckNotice()
    }, [notification.read])
    return (
        <Item
            className={`
    w-full cursor-pointer transition-all duration-200 rounded-xl border
    ${read
                    ? "bg-slate-50 border-slate-200"
                    : "bg-blue-50 border-blue-200 shadow-sm"}
    hover:shadow-md hover:scale-[1.01]
  `}
        >
            <ItemHeader className="pb-1">
                <ItemTitle className="text-sm font-semibold text-gray-800 flex justify-between items-center">
                    {notification.title}

                    {!read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                </ItemTitle>
            </ItemHeader>

            <ItemContent
                onClick={onCheckNotice}
                className="text-sm text-gray-600 space-y-1"
            >
                <p className="line-clamp-2">{notification.message}</p>

                <p className="text-xs text-gray-400">
                    {new Date(notification.created_at).toLocaleString()}
                </p>
            </ItemContent>
        </Item>
    )
}