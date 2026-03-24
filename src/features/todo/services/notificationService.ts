import type { Notification } from "../../../types/notification"
import type { Task } from "../../../types/task"
export const getNotifications = () => {
    const notifications: Notification[] = localStorage.getItem("notifications") ? JSON.parse(localStorage.getItem("notifications")!) : []
    return notifications
}
export const createNotification = (notification: Notification) => {
    const notifications = getNotifications()
    notifications.push(notification)
    localStorage.setItem("notifications", JSON.stringify(notifications))
    return notification
}
export const updateNotification = async (notification: Notification) => {
    const notifications = await getNotifications()
    const index = notifications.findIndex((n) => n.id === notification.id)
    if (index === -1) {
        throw new Error("Notification not found")
    }
    notifications[index] = notification
    localStorage.setItem("notifications", JSON.stringify(notifications))
    return notification
}
export const deleteNotification = async (id: number) => {
    const notifications = await getNotifications()
    const updatedNotifications = notifications.filter((n) => n.id !== id)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
    return id
}
export const createNotificationsByTasks = (tasks: Task[]) => {
    const notificationsList = getNotifications();
    const newnotificationsList: Notification[] = tasks.map((t) => {
        return {
            id: t.id,
            message: `Task ${t.title} is near deadline`,
            title: "Notification",
            created_at: new Date(),
            read: false,
        }
    })
    notificationsList.push(...newnotificationsList)
    localStorage.setItem("notifications", JSON.stringify(notificationsList))
    return notificationsList
}