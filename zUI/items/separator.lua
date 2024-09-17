--- Ajouter un séparateur au menu.
---@param Title string @Titre du séparateur.
---@param Position string | nil @Position du séparateur.
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
