--- Retourner en arrière
function zUI:Goback()
    if self.parent then
        self.priority = false
        self.parent.priority = true
        UpdateItems(self.parent)
        MenuControls(self.parent)
        SendNUIMessage({
            action = "zUI-Reset",
        })
    else
        ShowError("Vous ne pouvez pas utiliser la méthode 'GoBack' sur un menu !")
    end
end
