--- Displays the information panel.
---@param Title string @The title of the panel.
---@param Banner string | nil @The URL of the menu banner (optional).
---@param Infos table @The information to display in the panel.
function zUI.ShowInfo(Title, Banner, Infos)
    SendNUIMessage({
        action = "zUI-ShowInfoPanel",
        data = {
            title = Title,
            banner = Banner,
            infos = Infos
        }
    })
end
