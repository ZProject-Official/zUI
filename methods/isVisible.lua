--- Récupérer l'êtat de visibilité de l'instance.
function zUI:IsVisible()
    if not self.parent then
        return self.isVisible
    else
        return ShowError("Vous ne pouvez pas utiliser la méthode 'IsVisible' sur un submenu !")
    end
end
