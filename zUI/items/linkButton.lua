--- Ajouter un bouton au menu.
---@param Title string | number @Titre du bouton.
---@param Description string | number | nil @Description du bouton.
---@param Styles { IsDisabled: boolean, Color: string } @Éléments de style du bouton.
---@param Link string @Lien vers lequel le bouton dois rediriger.
function zUI:AddLinkButton(Title, Description, Styles, Link)
    local Item = {}
    Item.type = "linkButton"
    Item.title = Title
    Item.description = Description or ""
    Item.styles = Styles
    Item.link = Link
    table.insert(self.items, Item)
end
