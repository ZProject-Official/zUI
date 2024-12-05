--- Changes the focus state of the zUI.
---@param State boolean @The new focus state (true to enable focus, false to disable).
function zUI.SetFocus(State)
    zUI.IsFocused = State
    ManageFocus()
end
