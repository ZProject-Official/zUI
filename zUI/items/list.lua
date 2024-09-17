--- Ajouter une liste au menu.
---@param Title string @Titre de la liste.
---@param Description string | nil @Description de la liste.
---@param Items table @Êtat de la liste.
---@param Styles { IsDisabled: boolean, RightLabel: string, RightBadge: BadgeName, LeftBadge: BadgeName, Color: string } @Éléments de style de la liste.
---@param Action fun(onSelected: boolean, onHovered: boolean, onListChange: boolean, index: number) @Action que doit réaliser la liste.
function zUI:AddList(Title, Description, Items, Styles, Action)
    local ActionId = ("zUI-ListIdentifier:%s"):format(#self.items + 1)
    local Item = {}
    Item.type = "list"
    Item.title = Title
    Item.description = Description or ""
    Item.items = Items
    Item.styles = Styles
    Item.actionId = ActionId
    table.insert(self.items, Item)
    ItemsData[ActionId] = { action = Action }
end

RegisterNUICallback("zUI-UseList", function(data, cb)
    local ActionData = ItemsData[data.actionId]
    if ActionData.action then
        ActionData.action(data.Selected, true, data.ListChange, data.Index)
    end
    cb("ok")
end)
