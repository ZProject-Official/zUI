--- Set the menu items.
---@param Items fun(Items: zUI) @Function to add the items
function zUI:SetItems(Items)
    self.itemsManager = Items
end
