---@class zUI
---@field identifier string | nil @Identifiant du menu.
---@field title string | nil @Titre du menu.
---@field subtitle string | nil @Sous-titre du menu.
---@field banner string | nil @Lien direct vers la bannière du menu.
---@field key string | nil @Touche sur laquelle appuyer pour ouvrir le menu.
---@field description string | nil @Description à afficher dans les paramètres.
---@field itemsManager fun() | nil @Function pour définir les items.
---@field items table @Items visible dans le menu.
---@field isVisible boolean @Êtat de visibilité du menu.
---@field priority boolean @Êtat de priorité du menu.
---@field openingEvent fun() | nil @Function à exécuté à l'ouverture du menu.
---@field closingEvent fun() | nil @Function à exécuté à la fermeture du menu.
---@field closable boolean @Fermeture du menu autorisé ou non.
---@field parent zUI @Menu parent du menu.
zUI = {}
zUI.__index = zUI

Menus = {}

--- Créer une instance du zUI.
---@param Title string | nil @Titre du menu.
---@param Subtitle string | nil @Sous-titre du menu.
---@param Banner string | nil @Lien direct vers la bannière du menu.
---@param Key string | nil @Touche sur laquelle appuyer pour ouvrir le menu.
---@param Description string | nil @Description à afficher dans les paramètres.
function zUI.CreateMenu(Title, Subtitle, Banner, Key, Description)
    local MenuId = #Menus + 1
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.identifier = ("zUI-MenuIdentifier:%s"):format(MenuId)
    self.title = Title or ""
    self.subtitle = Subtitle or ""
    self.banner = Banner or ""
    self.key = Key or nil
    self.description = Description or nil
    self.items = {}
    self.itemsManager = nil
    self.isVisible = false
    self.priority = false
    self.closable = true
    self.openingEvent = nil
    self.closingEvent = nil
    Menus[MenuId] = self
    RegisterMenu(self)
    return self
end

--- Créer une instance du zUI.
---@param Parent zUI @Parent du submenu.
---@param Title string | nil @Titre du menu.
---@param Subtitle string | nil @Sous-titre du menu.
---@param Banner string | nil @Lien direct vers la bannière du menu.
function zUI.CreateSubMenu(Parent, Title, Subtitle, Banner)
    local MenuId = #Menus + 1
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.identifier = ("zUI-SubMenuIdentifier:%s"):format(MenuId)
    self.parent = Parent
    self.title = Title or ""
    self.subtitle = Subtitle or ""
    self.banner = Banner or ""
    self.items = {}
    self.itemsManager = nil
    self.priority = false
    self.openingEvent = nil
    self.closingEvent = nil
    Menus[MenuId] = self
    return self
end
