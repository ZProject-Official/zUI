--- Get the visibility state of the instance.
function zUI:IsVisible()
    if not self.parent then
        return self.isVisible
    else
        return ShowError("You cannot use the 'IsVisible' method on a submenu!")
    end
end
