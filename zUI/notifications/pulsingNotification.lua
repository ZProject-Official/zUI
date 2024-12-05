--- Display a pulsing notification.
---@param key string @Assigned key.
---@param description string @Description of the action.
---@param coords vector3 @Coordinates of the notification.
---@param styles { Color: string, IsDisabled: boolean, Scale: number } @Styles of the notification.
function zUI.DisplayPulsingNotification(key, description, coords, styles)
    local screenPosX, screenPosY, isVisibleOnScreen
    local isOffScreen, hudX, hudY = GetHudScreenPositionFromWorldPosition(coords.x, coords.y, coords.z)
    screenPosX, screenPosY = hudX * 100, hudY * 100
    isVisibleOnScreen = not isOffScreen

    SendNUIMessage({
        action = "zUI-DisplayPulsingNotification",
        data = {
            key = key,
            description = description,
            coords = { x = screenPosX, y = screenPosY },
            isVisibleOnScreen = isVisibleOnScreen,
            styles = styles
        }
    })
end
