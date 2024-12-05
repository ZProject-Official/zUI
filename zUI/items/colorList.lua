--- Add a color list to the menu.
---@param Title string | number @The title of the list.
---@param Description string | number | nil @The description of the list.
---@param Index number @The index displayed by the list.
---@param Items table @The colors in the list.
---@param Styles { IsDisabled: boolean, LeftBadge: BadgeName, Color: string } @The style elements of the list.
---@param Action fun(onSelected: boolean, onHovered: boolean, onListChange: boolean, index: number) @The action the list should perform.
function zUI:AddColorList(Title, Description, Index, Items, Styles, Action)
    if self.type ~= "menu" then
        return ShowError("The item ^3ColorList^1 cannot be added to a contextMenu.")
    end
    local ActionId = ("zUI-Menu:%s@ColorListIdentifier:%s"):format(self.identifier, #self.items + 1)
    local Item = {}
    Item.type = "colorList"
    Item.title = Title
    Item.description = Description or ""
    Item.index = Index or 0
    Item.items = Items
    Item.styles = Styles
    Item.actionId = ActionId
    table.insert(self.items, Item)
    ItemsData[ActionId] = { action = Action }
end
