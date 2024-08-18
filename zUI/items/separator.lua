---@param Title string @Le titre du separateur
function zUI:AddSeparator(Title)
    local Item = {}
    Item.Type = "separator"
    Item.Title = Title
    table.insert(self.Items, Item)
end
