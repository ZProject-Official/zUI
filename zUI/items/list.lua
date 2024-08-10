---@param Label string @Le nom de la list | The List's name
---@param Description string @La description de la list | The List's description
---@param Items table @La liste des items | The list of items
---@param Styles table @Les styles de la liste | The List's styles
---@param Action fun(onSelected: boolean, onHovered: boolean, Index: number) @Les actions de la list | The List's actions
function zUI:AddList(Label, Description, Items, Styles, Action, SubMenu)
    local actionId = ("%s_list-actionId_zui_%s"):format(Label:gsub(" ", ""):lower(), math.random())
    ItemsData[actionId] = { action = Action }
    local item = {
        type = "list",
        label = Label,
        description = Description,
        items = Items,
        styles = {
            color = Styles.Color,
            hoverColor = Styles.HoverColor,
            isDisabled = Styles.IsDisabled,
        },
        actionId = actionId
    }
    table.insert(self.items, item)
end

RegisterNUICallback('zUI-ActionList', function(data, cb)
    local actionData = ItemsData[data.id]
    if actionData.action then
        actionData.action(true, true, data.index)
    end
    cb('ok')
end)
