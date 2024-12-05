--- Add a link button to the menu.
---@param Title string | number @The title of the button.
---@param Description string | number | nil @The description of the button.
---@param Styles { IsDisabled: boolean, Color: string } @The style elements of the button.
---@param Link string @The link the button should redirect to.
function zUI:AddLinkButton(Title, Description, Styles, Link)
    local ActionId = ("zUI-Menu:%s@LinkButtonIdentifier:%s"):format(self.identifier, #self.items + 1)
    local Item = {}
    Item.type = "linkButton"
    Item.title = Title
    Item.description = Description or ""
    Item.styles = Styles
    Item.actionId = ActionId
    Item.link = Link
    table.insert(self.items, Item)
end
