---@param Title string @Titre du bouton
---@param Description string @Description du bouton
---@param Styles { IsDisabled: boolean, RightLabel: string, RightBadge: string, LeftBadge: string, Color: string, HoverColor: string } @Styles du bouton
---@param Action fun(onSelected: boolean, onHovered: boolean) @Action que doit réaliser le bouton
---@param SubMenu zUI | nil @SubMenu vers lequel mène le bouton
function zUI:AddButton(Title, Description, Styles, Action, SubMenu)
    local ActionId = ("zUI-ButtonIdentifier:%s"):format(math.random())
    local Item = {}
    Item.Type = "button"
    Item.Title = Title
    Item.Description = Description
    Item.Styles = Styles
    Item.ActionId = ActionId
    ItemsData[ActionId] = { Action = Action, Parent = self, SubMenu = SubMenu }
    table.insert(self.Items, Item)
end

RegisterNUICallback("zUI-UseButton", function(ActionId, cb)
    local ActionData = ItemsData[ActionId]
    if ActionData.Action then
        ActionData.Action(true, true)
    end
    if ActionData.SubMenu then
        Citizen.Wait(10)
        ActionData.Parent.Priority = false
        ActionData.SubMenu.Priority = true
        SendNUIMessage({
            action = "zUI-Reset",
        })
    end
    cb("ok")
end)
