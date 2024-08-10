function RegisterMenu(Menu)
    if Menu.key then
        RegisterKeyMapping(Menu.identifier, Menu.description, 'keyboard', Menu.key)
    end
    RegisterCommand(Menu.identifier, function()
        if not IsPedDeadOrDying(PlayerPedId(), true) then
            Menu.visible = not Menu.visible
            ManageMenu(Menu)
        end
    end, false)
end
