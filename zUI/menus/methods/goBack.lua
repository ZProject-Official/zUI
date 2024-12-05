--- Go back to the previous menu.
function zUI:Goback()
    if self.parent then
        self.priority = false
        self.parent.priority = true
        UpdateItems(self.parent)
        ManageControls(self.parent)
        SendNUIMessage({
            action = "zUI-Reset",
        })
    else
        ShowError("You cannot use the 'GoBack' method on a menu!")
    end
end
