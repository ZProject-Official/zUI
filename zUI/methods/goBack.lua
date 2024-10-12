--- Retourner en arrière
function zUI:Goback()
    assert(self.parent, "Vous ne pouvez pas utilisez la méthode 'GoBack' car " .. self.identifier .. " n'est pas un submenu")
    self.priority = false
    self.parent.priority = true
    UpdateItems(self.parent)
    MenuControls(self.parent)
    SendNUIMessage({
        action = "zUI-Reset",
    })
end
