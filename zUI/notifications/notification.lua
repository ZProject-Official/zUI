--- Send a notification.
---@param title string @The title of the notification.
---@param message string @The message of the notification.
---@param type { color: string | nil, content: string | nil } @The type of the notification.
---@param icon string | nil @The icon of the notification.
---@param banner string | nil @The banner of the notification.
---@param time string | nil @The duration of the notification.
function zUI.SendNotification(title, message, type, icon, banner, time)
    SendNUIMessage({
        action = "zUI-SendNotification",
        data = {
            title = title,
            description = message,
            type = type,
            icon = icon,
            banner = banner,
            time = time,
        }
    })
end
