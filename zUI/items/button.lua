--- Add a button to the menu.
---@param Title string | number @The title of the button.
---@param Description string | number | nil @The description of the button.
---@param Styles { IsDisabled: boolean, RightLabel: string | number, RightBadge: BadgeName, LeftBadge: BadgeName, Color: string } @The style elements of the button.
---@param Action fun(onSelected: boolean, onHovered: boolean) @The action the button should perform.
---@param Submenu zUI | nil @The submenu that the button leads to.
function zUI:AddButton(Title, Description, Styles, Action, Submenu)
    local ActionId = ("zUI-Menu:%s@ButtonIdentifier:%s"):format(self.identifier, #self.items + 1)
    local Item = {}
    Item.type = "button"
    Item.title = Title
    Item.description = Description or ""
    Item.styles = Styles
    Item.actionId = ActionId
    table.insert(self.items, Item)
    ItemsData[ActionId] = { action = Action, parent = self, submenu = Submenu }
end

RegisterNUICallback("zUI-UseButton", function(ActionId, cb)
    local ActionData = ItemsData[ActionId]
    if ActionData.action then
        ActionData.action(true, true)
    end
    if ActionData.submenu then
        Citizen.Wait(10)
        ActionData.parent.priority = false
        ActionData.submenu.priority = true
        if ActionData.submenu.openingEvent then
            ActionData.submenu.openingEvent()
        end
        UpdateItems(ActionData.submenu)
        ManageControls(ActionData.submenu)
        SendNUIMessage({
            action = "zUI-Reset",
            data = {
                lastMenu = ActionData.parent.identifier,
                newMenu = ActionData.submenu.identifier
            }
        })
    end
    cb("ok")
end)
