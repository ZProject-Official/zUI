--- Add a line to the menu.
---@param Colors table | nil @The colors of the line.
function zUI:AddLine(Colors)
    local Item = {}
    Item.type = "line"
    Item.colors = Colors
    table.insert(self.items, Item)
end
