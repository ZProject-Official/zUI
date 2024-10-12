---@param menu zUI @Menu à enregistrer.
function RegisterMenu(menu)
    assert(menu.key, "Aucune touche défini")
    assert(menu.description, "Aucune description défini")
    RegisterCommand(menu.identifier, function()
        if not IsPedDeadOrDying(PlayerPedId(), true) then
            menu:SetVisible(not menu:IsVisible())
        end
    end, false)
    RegisterKeyMapping(menu.identifier, menu.description, "keyboard", menu.key)
end
