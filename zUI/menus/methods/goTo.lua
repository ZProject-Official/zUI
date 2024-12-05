--- Go to a specific instance of the zUI.
---@param target zUI @The target menu or submenu to go to.
function zUI:Goto(target)
    self.priority = false
    target.priority = true
    UpdateItems(target)
    ManageControls(target)
    SendNUIMessage({
        action = "zUI-Reset",
    })
end
