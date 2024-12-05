--- Update the items of a menu.
---@param Menu zUI @The menu to update the items for.
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
                        description = Menu.description,
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
        SendNUIMessage({
            action = "zUI-ManageMenu",
            data = {
                isVisible = false,
            }
        })
    end)
end
