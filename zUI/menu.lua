---@class zUI
---@field public identifier string @Identifiant du menu | Identifier of the menu
---@field public title string @Titre du menu | Title of the menu
---@field public subtitle string @Sous-titre du menu | Subtitle of the menu
---@field public key string | nil @Touche pour ouvrir le menu | Key for open the menu
---@field public description string | nil @Description du menu | Description of the menu
---@field public banner string | nil @Bannière du menu | Banner of the menu
---@field public visible boolean @Visibilité du menu | Visibility of the menu
---@field public items table @Items du menu | Items of the menu
---@field public parent zUI
zUI = {}
zUI.__index = zUI

local menus = {}

ItemsData = {}

---@param Title string @Le nom du menu | The Menu's name
---@param Subtitle string @Sous-titre du menu | The Menu's subtitle
---@param Key string | nil @Touche du menu | The Menu's key
---@param Description string | nil @Description du menu | The Menu's description
---@param Banner string | nil @Lien de la bannière du menu | Link of Menu's banner [380px * 100px]
function zUI.CreateMenu(Title, Subtitle, Key, Description, Banner)
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.identifier = ("%s_zui_%s"):format(Title:gsub(" ", ""):lower(), math.random())
    self.title = Title
    self.subtitle = Subtitle
    self.key = Key
    self.description = Description
    self.banner = Banner
    self.visible = false
    self.items = {}
    RegisterMenu(self)
    table.insert(menus, self)
    return self
end

---@param Parent zUI @Le parent du sous-menu | The Submenu's parent
---@param Title string @Le nom du menu | The Menu's name
---@param Subtitle string @Sous-titre du menu | The Menu's subtitle
---@param Banner string | nil @Lien de la bannière du menu | Link of Menu's banner [380px * 100px]
function zUI.CreateSubMenu(Parent, Title, Subtitle, Banner)
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.identifier = ("%s_zui-submenu_%s"):format(Title:gsub(" ", ""):lower(), math.random())
    self.parent = Parent
    self.title = Title
    self.subtitle = Subtitle
    self.banner = Banner
    self.visible = false
    self.items = {}
    table.insert(menus, self)
    return self
end

---@param components fun(Menu: zUI) @Les composants du menu | The menu's components
function zUI:SetComponents(components)
    components(self)
end

---@param visible boolean @Visibilité du menu | Visibility of the menu
function zUI:SetVisible(visible)
    self.visible = visible
end

---@return boolean @Visibilité du menu | Visibility of the menu
function zUI:IsVisible()
    return self.visible
end
