Citizen.CreateThread(function()
    local Delay = 500
    while true do
        Wait(Delay)
        if MenuIsVisible then
            Delay = 0
            if IsControlPressed(2, 172) then -- Arrow UP
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "up"
                    }
                })
            elseif IsControlPressed(2, 173) then -- Arrow DOWN
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "down"
                    }
                })
            elseif IsControlPressed(2, 174) then -- Arrow LEFT
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "left"
                    }
                })
            elseif IsControlPressed(2, 175) then -- Arrow RIGHT
                Delay = 125
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "right"
                    }
                })
            else
                Delay = 0
            end

            if IsControlJustPressed(2, 191) then -- Enter
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "enter"
                    }
                })
            elseif IsControlJustPressed(2, 194) then -- Backspace
                if CurrentMenu then
                    if CurrentMenu.Parent then
                        CurrentMenu.Priority = false
                        CurrentMenu.Parent.Priority = true
                        SendNUIMessage({
                            action = "zUI-Reset",
                        })
                        PlaySound("backspace")
                    else
                        CurrentMenu:SetVisible(not CurrentMenu:IsVisible())
                    end
                end
            end
        end
    end
end)
