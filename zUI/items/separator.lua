--- Add a separator to the menu.
---@param Title string | number @The title of the separator.
---@param Position string | nil @The position of the separator.
function zUI:AddSeparator(Title, Position)
    local Item = {}
    Item.type = "separator"
    Item.title = Title
    Item.position = Position or "center"
    table.insert(self.items, Item)
end

---@alias Position
---| "left"
---| "center"
---| "right"
