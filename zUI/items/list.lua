---@param Title string @Titre de la liste
---@param Description string | nil @Description de la list
---@param Items table @Items de la liste
---@param Styles { IsDisabled: boolean, LeftBadge: string, Color: string, HoverColor: string } @Styles de la liste
---@param Action fun(onSelected: boolean, onHovered: boolean, index: number) @Action que doit réaliser la liste
function zUI:AddList(Title, Description, Items, Styles, Action)
    local ActionId = ("zUI-ListIdentifier:%s"):format(math.random())
    local Item = {}
    Item.Type = "list"
    Item.Title = Title
    Item.Description = Description
    Item.Styles = Styles
    Item.Items = Items
    Item.ActionId = ActionId
    ItemsData[ActionId] = { Action = Action }
    table.insert(self.Items, Item)
end

RegisterNUICallback("zUI-UseList", function(data, cb)
    local ActionData = ItemsData[data.ActionId]
    if ActionData.Action then
        ActionData.Action(true, true, data.Index)
    end
    cb("ok")
end)
