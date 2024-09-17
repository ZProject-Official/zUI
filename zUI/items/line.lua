--- Ajouter une ligne au menu.
---@param Colors table | nil @Couleurs de la ligne.
function zUI:AddLine(Colors)
    local Item = {}
    Item.type = "line"
    Item.colors = Colors
    table.insert(self.items, Item)
end
