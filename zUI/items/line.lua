---@param Colors table | nil @Les couleurs de la ligne | The colors of the line
function zUI:AddLine(Colors)
    local item = {
        type = "line",
        colors = Colors,
    }
    table.insert(self.items, item)
end
