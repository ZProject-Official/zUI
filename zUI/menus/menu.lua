Menus = {}

--- Create an instance of the zUI menu.
---@param title string | nil @The title of the menu.
---@param subTitle string | nil @The subtitle of the menu.
---@param description string | nil @A description of the menu.
---@param banner string | nil @A link to the menu banner.
---@param key string | nil @The key to press to open the menu.
---@param mappingDescription string | nil @A description to display in the settings.
function zUI.CreateMenu(title, subTitle, description, banner, key, mappingDescription)
    local menuId = #Menus + 1
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.type = "menu"
    self.identifier = ("zUI-MenuIdentifier:%s:%s"):format(menuId, math.random())
    self.title = title or ""
    self.subtitle = subTitle or ""
    self.description = description or ""
    self.banner = banner or ""
    self.key = key or ""
    self.mappingDescription = mappingDescription or ""
    self.items = {}
    self.itemsManager = nil
    self.isVisible = false
    self.priority = false
    self.closable = true
    self.openingEvent = nil
    self.closingEvent = nil
    Menus[menuId] = self
    RegisterMenu(self)
    return self
end

--- Create an instance of the zUI submenu.
---@param parent zUI @The parent of the submenu.
---@param title string | nil @The title of the submenu.
---@param subTitle string | nil @The subtitle of the submenu.
---@param description string | nil @A description of the submenu.
---@param banner string | nil @A direct link to the submenu banner.
function zUI.CreateSubMenu(parent, title, subTitle, description, banner)
    local menuId = #Menus + 1
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.type = "menu"
    self.identifier = ("zUI-SubMenuIdentifier:%s"):format(menuId)
    self.parent = parent
    self.title = title or ""
    self.subtitle = subTitle or ""
    self.description = description or ""
    self.banner = banner or ""
    self.items = {}
    self.itemsManager = nil
    self.priority = false
    self.openingEvent = nil
    self.closingEvent = nil
    Menus[menuId] = self
    return self
end
