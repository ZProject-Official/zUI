--- Définir la fonction à exécuter lors de la fermeture du menu.
---@param Event fun() @Évènement à exécuter.
function zUI:OnClose(Event)
    if not self.parent then
        self.closingEvent = Event
    else
        return ShowError("Vous ne pouvez pas utiliser la méthode 'OnClose' sur un submenu !")
    end
end
