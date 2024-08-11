---@param Label string @Le nom du bouton | The Button's name
---@param Description string @La description du bouton | The Button's description
---@param Styles table @Les styles du bouton | The Button's styles
---@param Action fun(onSelected: boolean, onHovered: boolean) @Les actions du bouton | The Button's actions
---@param SubMenu zUI | nil @Le sous-menu du bouton | The Button's sub-menu
function zUI:AddButton(Label, Description, Styles, Action, SubMenu)
    local actionId = ("%s_button-actionId_zui_%s"):format(Label:gsub(" ", ""):lower(), math.random())
    if SubMenu then
        ItemsData[actionId] = { action = Action, subMenu = SubMenu }
    else
        ItemsData[actionId] = { action = Action }
    end
    local item = {
        type = "button",
        label = Label,
        description = Description,
        styles = {
            leftBadge = Styles.LeftBadge,
            rightBadge = Styles.RightBadge,
            rightLabel = Styles.RightLabel,
            color = Styles.Color,
            hoverColor = Styles.HoverColor,
            isDisabled = Styles.IsDisabled,
        },
        actionId = actionId
    }
    table.insert(self.items, item)
end

RegisterNUICallback('zUI-ActionButton', function(id, cb)
    local actionData = ItemsData[id]
    if actionData.action then
        actionData.action(true, true)
    end
    if actionData.subMenu then
        Citizen.Wait(50)
        actionData.subMenu.visible = true
        actionData.subMenu.parent.visible = false
        ManageMenu(actionData.subMenu)
    end
    cb('ok')
end)
