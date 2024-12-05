--- Register a menu.
---@param menu zUI @The menu to register.
function RegisterMenu(menu)
    if menu.key and menu.mappingDescription then
        RegisterCommand(menu.identifier, function()
            menu:SetVisible(not menu:IsVisible())
        end, false)
        RegisterKeyMapping(menu.identifier, menu.mappingDescription, "keyboard", menu.key)
    end
end
