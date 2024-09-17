--- Ajouter une checkbox au menu.
---@param Title string @Titre de la checkbox.
---@param Description string | nil @Description de la checkbox.
---@param State boolean @Êtat de la checkbox.
---@param Styles { IsDisabled: boolean, RightLabel: string, RightBadge: BadgeName, LeftBadge: BadgeName, Color: string } @Éléments de style de la checkbox.
---@param Action fun(onSelected: boolean, onHovered: boolean) @Action que doit réaliser la checkbox.
function zUI:AddCheckbox(Title, Description, State, Styles, Action)
    local ActionId = ("zUI-CheckboxIdentifier:%s"):format(#self.items + 1)
    local Item = {}
    Item.type = "checkbox"
    Item.title = Title
    Item.description = Description or ""
    Item.state = State
    Item.styles = Styles
    Item.actionId = ActionId
    table.insert(self.items, Item)
    ItemsData[ActionId] = { action = Action }
end

RegisterNUICallback("zUI-UseCheckbox", function(ActionId, cb)
    local ActionData = ItemsData[ActionId]
    if ActionData.action then
        ActionData.action(true, true)
    end
    cb("ok")
end)
