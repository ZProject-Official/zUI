--- Définir la fonction à exécuter lors de l'ouverture du menu.
---@param Event fun() @Évènement à exécuter.
function zUI:OnOpen(Event)
    if not self.parent then
        self.openingEvent = Event
    else
        return ShowError("Vous ne pouvez pas utiliser la méthode 'OnOpen' sur un submenu !")
    end
end
