--- Add a slider to the menu.
---@param Title string @The title of the slider.
---@param Description string | number | nil @The description of the slider.
---@param Percentage number | nil @The percentage of the slider.
---@param Step number @The step value to adjust the percentage.
---@param Styles { IsDisabled: boolean, Color: string, ShowPercentage: boolean } @The style elements of the slider.
---@param Action fun(onSelected: boolean, onHovered: boolean, onChange: boolean, percentage: number) @The action the slider should perform.
function zUI:AddSlider(Title, Description, Percentage, Step, Styles, Action)
    if self.type ~= "menu" then
        return ShowError("The item ^3Slider^1 cannot be added to a contextMenu.")
    end
    local ActionId = ("zUI-Menu:%s@SliderIdentifier:%s"):format(self.identifier, #self.items + 1)
    local Item = {}
    Item.type = "slider"
    Item.title = Title
    Item.description = Description or ""
    Item.percentage = Percentage or 100
    Item.step = Step or 10
    Item.styles = Styles
    Item.actionId = ActionId
    table.insert(self.items, Item)
    ItemsData[ActionId] = { action = Action }
end

RegisterNUICallback("zUI-UseSlider", function(data, cb)
    local ActionData = ItemsData[data.actionId]
    if ActionData.action then
        ActionData.action(data.selected, true, data.change or false, data.percentage)
    end
    cb("ok")
end)
