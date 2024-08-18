function RegisterMenu(menu)
    if menu.Key and menu.Description then
        RegisterCommand(menu.Identifier, function()
            if not IsPedDeadOrDying(PlayerPedId(), true) then
                menu:SetVisible(not menu:IsVisible())
            end
        end, false)
        RegisterKeyMapping(menu.Identifier, menu.Description, 'keyboard', menu.Key)
    end
end
