--- Add a checkbox to the menu.
---@param Title string | number @The title of the checkbox.
---@param Description string | number | nil @The description of the checkbox.
---@param State boolean @The state of the checkbox.
---@param Styles { IsDisabled: boolean, RightLabel: string | number, RightBadge: BadgeName, LeftBadge: BadgeName, Color: string } @The style elements of the checkbox.
---@param Action fun(onSelected: boolean, onHovered: boolean) @The action the checkbox should perform.
function zUI:AddCheckbox(Title, Description, State, Styles, Action)
    local ActionId = ("zUI-Menu:%s@CheckboxIdentifier:%s"):format(self.identifier, #self.items + 1)
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
