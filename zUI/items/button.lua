--- Ajouter un bouton au menu.
---@param Title string | number @Titre du bouton.
---@param Description string | number | nil @Description du bouton.
---@param Styles { IsDisabled: boolean, RightLabel: string | number, RightBadge: BadgeName, LeftBadge: BadgeName, Color: string } @Éléments de style du bouton.
---@param Action fun(onSelected: boolean, onHovered: boolean) @Action que doit réaliser le bouton.
---@param Submenu zUI | nil @Submenu vers lequel mène le bouton.
function zUI:AddButton(Title, Description, Styles, Action, Submenu)
    local ActionId = ("zUI-ButtonIdentifier:%s"):format(#self.items + 1)
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
        UpdateItems(ActionData.submenu)
        MenuControls(ActionData.submenu)
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
