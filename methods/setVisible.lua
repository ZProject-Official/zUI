---@param IsVisible boolean @Êtat de visibilité du menu.
function zUI:SetVisible(IsVisible)
    if not self.parent then
        if IsVisible then
            PlaySound("toggle")
            zUI.CloseAll()
            SendNUIMessage({
                action = "zUI-ManageMenu",
                data = {
                    isVisible = true,
                    items = self.items,
                    title = self.title,
                    subtitle = self.subtitle,
                    banner = self.banner,
                }
            })
            if self.openingEvent then
                self.openingEvent()
            end
            self.priority = true
            self.isVisible = true
            UpdateItems(self)
            MenuControls(self)
        else
            if self.closable then
                PlaySound("backspace")
                if self.closingEvent then
                    self.closingEvent()
                end
                self.priority = false
                self.isVisible = false
                Wait(75)
                SendNUIMessage({
                    action = "zUI-ManageMenu",
                    data = {
                        isVisible = false,
                    }
                })
            end
        end
    else
        ShowError("Vous ne pouvez pas utiliser la méthode 'SetVisible' sur un submenu !")
    end
end
