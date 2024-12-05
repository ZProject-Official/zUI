--- Close all instances of the zUI.
function zUI.CloseAll()
    for _, instance in pairs(Menus) do
        instance.isVisible = false
        instance.priority = false
    end
end
