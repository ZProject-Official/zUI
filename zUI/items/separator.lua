---@param Label string @Le label du separateur | The label of the separator
function zUI:AddSeparator(Label)
    local item = {
        type = "separator",
        label = Label,
    }
    table.insert(self.items, item)
end
