---@param menu zUI @Menu à enregistrer.
function RegisterMenu(menu)
    if menu.key and menu.description then
        RegisterCommand(menu.identifier, function()
            if not IsPedDeadOrDying(PlayerPedId(), true) then
                menu:SetVisible(not menu:IsVisible())
            end
        end, false)
        RegisterKeyMapping(menu.identifier, menu.description, 'keyboard', menu.key)
    end
end
