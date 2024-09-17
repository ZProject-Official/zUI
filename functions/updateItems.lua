function UpdateItems(Menu)
    Citizen.CreateThread(function()
        while Menu.priority do
            Citizen.Wait(75)
            if not IsPauseMenuActive() then
                Menu.items = {}
                Menu.itemsManager(Menu)
                SendNUIMessage({
                    action = "zUI-ManageMenu",
                    data = {
                        isVisible = true,
                        items = Menu.items,
                        title = Menu.title,
                        subtitle = Menu.subtitle,
                        banner = Menu.banner,
                    }
                })
            else
                SendNUIMessage({
                    action = "zUI-ManageMenu",
                    data = {
                        isVisible = false,
                    }
                })
            end
        end
    end)
end
