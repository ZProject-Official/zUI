---@class zUI
---@field type "menu" | "context" @Type of the menu
---@field entityType EntityType @Type of entity supported by the context
---@field identifier string @Identifier for the menu
---@field title string | nil @Title of the menu
---@field subtitle string | nil @Subtitle of the menu
---@field description string | nil @Description of the menu
---@field banner string | nil @Banner of the menu
---@field key string | nil @Key to press to open the menu
---@field mappingDescription string | nil @Description to display in settings
---@field itemsManager fun() @Function to define the items of the menu
---@field items table @List of items in the menu
---@field isVisible boolean @Visibility state of the menu
---@field priority boolean @Priority state of the menu
---@field openingEvent fun() @Function to execute when the menu opens
---@field closingEvent fun() @Function to execute when the menu closes
---@field closable boolean @Whether the menu can be closed or not
---@field parent zUI | nil @Parent menu of the current menu
zUI = {}
zUI.__index = zUI

---@alias EntityType
---| "vehicle"
---| "ped"
---| "props"
---| "other"
---| vector3
