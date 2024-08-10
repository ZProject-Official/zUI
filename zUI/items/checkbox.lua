---@param Label string @Le nom de la checkbox | The Checkbox's name
---@param Description string @La description de la checkbox | The Checkbox's description
---@param DefaultState boolean @L'état par défaut de la checkbox | The Checkbox's default state
---@param Styles table @Les styles de la checkbox | The Checkbox's styles
---@param Action fun(onSelected: boolean, isChecked: boolean, onHovered: boolean) @Les actions de la checkbox | The Checkbox's actions
function zUI:AddCheckbox(Label, Description, DefaultState, Styles, Action)
    local actionId = ("%s_checkbox-actionId_zui_%s"):format(Label:gsub(" ", ""):lower(), math.random())
    ItemsData[actionId] = { action = Action }
    local item = {
        type = "checkbox",
        label = Label,
        description = Description,
        defaultState = DefaultState,
        styles = {
            leftBadge = Styles.LeftBadge,
            rightBadge = Styles.RightBadge,
            rightLabel = Styles.RightLabel,
            color = Styles.Color,
            hoverColor = Styles.HoverColor,
            isDisabled = Styles.IsDisabled,
            checkedColor = Styles.CheckedColor,
        },
        actionId = actionId
    }
    table.insert(self.items, item)
end

RegisterNUICallback('zUI-ActionCheckbox', function(data, cb)
    local actionData = ItemsData[data.actionId]
    local isChecked = data.isChecked
    if actionData.action then
        actionData.action(true, isChecked, true)
    end
    cb('ok')
end)
