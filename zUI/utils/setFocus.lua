local focused = false
function SetFocus(State)
    SetNuiFocus(State, State)
    SetNuiFocusKeepInput(State)
    focused = State
    if focused then
        CreateThread(function()
            while focused do
                Wait(0)
                DisableAllControlActions(0)
                EnableControlAction(0, 21, true) -- INPUT_SPRINT
                EnableControlAction(0, 22, true) -- INPUT_JUMP
                EnableControlAction(0, 30, true) -- INPUT_MOVE_LR
                EnableControlAction(0, 31, true) -- INPUT_MOVE_UD
                EnableControlAction(0, 59, true) -- INPUT_VEH_MOVE_LR
                EnableControlAction(0, 71, true) -- INPUT_VEH_ACCELERATE
                EnableControlAction(0, 72, true) -- INPUT_VEH_BRAKE
            end
        end)
    end
end
