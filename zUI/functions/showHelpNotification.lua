--- Afficher une notification d'aide.
---@param Key string @Touche attribuer
---@param Description string @Description de l'action
---@param Coords vector3 | nil @Coordonnés de la notification
function zUI.ShowHelpNotification(Key, Description, Coords)
    local screenX, screenY, onScreen

    if Coords then
        local isOnScreen, x, y = GetHudScreenPositionFromWorldPosition(Coords.x, Coords.y, Coords.z)
        screenX, screenY = x * 100, y * 100
        onScreen = not isOnScreen
    else
        screenX, screenY = 5, 3
        onScreen = true
    end

    SendNUIMessage({
        action = "zUI-ShowHelpNotification",
        data = {
            key = Key,
            description = Description,
            coords = { x = screenX, y = screenY },
            onScreen = onScreen
        }
    })
end
