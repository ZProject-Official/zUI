--- Display a pulsing notification.
---@param content string @The content of the notification.
---@param styles { Color: string } @The styles of the notification.
function zUI.ShowHelpNotification(content, styles)
    SendNUIMessage({
        action = "zUI-DisplayHelpNotification",
        data = {
            content = content,
            styles = styles
        }
    })
end
