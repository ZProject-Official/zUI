---@param Title string @Titre de la checkbox
---@param Description string | nil @Description de la checkbox
---@param State boolean @Êtat par défaut
---@param Styles { IsDisabled: boolean, Color: string, HoverColor: string, LeftBadge: string, CheckedColor: string} @Styles de la checkbox
---@param Action fun(onSelected: boolean, onHovered: boolean, isChecked: boolean) @Action que doit réaliser la checkbox
function zUI:AddCheckbox(Title, Description, State, Styles, Action)
    local ActionId = ("zUI-CheckboxIdentifier:%s"):format(math.random())
    local Item = {}
    Item.Type = "checkbox"
    Item.Title = Title
    Item.DefaultState = State
    Item.Description = Description
    Item.Styles = Styles
    Item.ActionId = ActionId
    ItemsData[ActionId] = { Action = Action }
    table.insert(self.Items, Item)
end

RegisterNUICallback("zUI-UseCheckbox", function(data, cb)
    local ActionData = ItemsData[data.ActionId]
    if ActionData.Action then
        ActionData.Action(true, true, data.State)
    end
    cb("ok")
end)
