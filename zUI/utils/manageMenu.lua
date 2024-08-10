local lastEnterPress = 0
local enterDelay = 0
local enterPressed = false

local lastBackspacePress = 0
local backspaceDelay = 0
local backspacePressed = false

local lastUpPress = 0
local lastDownPress = 0

local arrowDelay = 125
local delay = 60


function ManageMenu(Menu)
    if Menu and Menu.visible and not Menu.parent then
        PlaySoundFrontend(-1, "TOGGLE_ON", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    elseif not Menu.parent then
        PlaySoundFrontend(-1, "QUIT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    end

    while Menu and Menu.visible do
        Wait(delay)
        SendNUIMessage({
            action = 'zUI-ManageMenu',
            data = {
                isVisible = true,
                menu = Menu
            },
        })

        local currentTime = GetGameTimer()

        if IsControlPressed(0, 194) then -- Backspace
            if not backspacePressed and (currentTime - lastBackspacePress) > backspaceDelay then
                backspacePressed = true
                lastBackspacePress = currentTime
                PlaySoundFrontend(-1, "QUIT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
                if Menu.parent then
                    Menu.visible = false
                    Menu.parent.visible = true
                    ManageMenu(Menu.parent)
                    SendNUIMessage({
                        action = 'zUI-ManageMenu',
                        data = {
                            isVisible = false,
                            parent = Menu.parent or nil
                        },
                    })
                else
                    Menu.visible = not Menu.visible
                    SendNUIMessage({
                        action = 'zUI-ManageMenu',
                        data = {
                            isVisible = false,
                        },
                    })
                end
            end
        else
            backspacePressed = false
        end

        if IsControlPressed(0, 299) then -- Down
            if (currentTime - lastDownPress) > arrowDelay then
                lastDownPress = currentTime
                PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        type = "down"
                    }
                })
            end
        elseif IsControlPressed(0, 300) then -- Up
            if (currentTime - lastUpPress) > arrowDelay then
                lastUpPress = currentTime
                PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        type = "up"
                    }
                })
            end
        elseif IsControlPressed(0, 174) then
            if (currentTime - lastDownPress) > arrowDelay then
                lastDownPress = currentTime
                PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        type = "left"
                    }
                })
            end
        elseif IsControlPressed(0, 175) then
            if (currentTime - lastDownPress) > arrowDelay then
                lastDownPress = currentTime
                PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        type = "right"
                    }
                })
            end
        else
            if IsControlPressed(0, 201) then -- Enter
                if not enterPressed and (currentTime - lastEnterPress) > enterDelay then
                    enterPressed = true
                    lastEnterPress = currentTime
                    PlaySoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
                    SendNUIMessage({
                        action = "zUI-Interaction",
                        data = {
                            type = "enter"
                        }
                    })
                end
            else
                enterPressed = false
            end
        end
    end

    SendNUIMessage({
        action = 'zUI-ManageMenu',
        data = {
            isVisible = false,
        },
    })
end
