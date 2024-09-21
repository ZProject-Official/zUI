--- Se rendre dans une instance du zUI.
function zUI:Goto(target)
    self.priority = false
    target.priority = true
    UpdateItems(target)
    MenuControls(target)
    SendNUIMessage({
        action = "zUI-Reset",
    })
end
