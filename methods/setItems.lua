--- Définir les éléments du menu.
---@param Items fun(Items: zUI) @Function pour ajouter les items.
function zUI:SetItems(Items)
    self.itemsManager = Items
end
