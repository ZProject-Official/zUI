--- Manage the controls for interacting with the menu.
---@param Menu zUI @The menu to manage controls for.
function ManageControls(Menu)
    Citizen.CreateThread(function()
        local Delay = 0
        while Menu.priority do
            Citizen.Wait(Delay)
            if IsControlPressed(2, 172) then -- Arrow UP
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interact",
                    data = {
                        type = "up"
                    }
                })
            elseif IsControlPressed(2, 173) then -- Arrow DOWN
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interact",
                    data = {
                        type = "down"
                    }
                })
            elseif IsControlPressed(2, 174) then -- Arrow LEFT
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interact",
                    data = {
                        type = "left"
                    }
                })
            elseif IsControlPressed(2, 175) then -- Arrow RIGHT
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interact",
                    data = {
                        type = "right"
                    }
                })
            else
                Delay = 0
            end

            if IsControlJustPressed(2, 191) or IsControlJustPressed(2, 201) then -- Enter
                SendNUIMessage({
                    action = "zUI-Interact",
                    data = {
                        type = "enter"
                    }
                })
            elseif IsControlJustPressed(2, 194) then -- Backspace
                if Menu then
                    if Menu.parent then
                        Menu.priority = false
                        Menu.parent.priority = true
                        if Menu.closingEvent then
                            Menu.closingEvent()
                        end
                        UpdateItems(Menu.parent)
                        ManageControls(Menu.parent)
                        SendNUIMessage({
                            action = "zUI-Reset",
                            data = {
                                lastMenu = Menu.identifier,
                                newMenu = Menu.parent.identifier
                            }
                        })
                    else
                        Menu:SetVisible(not Menu:IsVisible())
                    end
                end
            end
        end
    end)
end
