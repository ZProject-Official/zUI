---@param Colors table | nil @Les couleurs de la ligne
function zUI:AddLine(Colors)
    local Item = {}
    Item.Type = "line"
    Item.Colors = Colors
    table.insert(self.Items, Item)
end
