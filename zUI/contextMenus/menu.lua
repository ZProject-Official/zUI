ContextMenus = {}
zUI.IsFocused = false

--- Creates an instance of a context menu.
---@param EntityType EntityType @The type of entity the menu will support.
---@param Items fun(Items: zUI, coords3D: vector3 | nil, Entity: integer | nil) @Callback to define the items of the context menu.
function zUI.CreateContext(EntityType, Items)
    for _, context in pairs(ContextMenus) do
        if context.entityType == EntityType then
            return ShowError(("A context menu already supports the entity type (%s)."):format(context.entityType))
        end
    end
    local menuId = #ContextMenus + 1
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.type = "context"
    self.identifier = ("zUI-ContextMenuIdentifier:%s:%s"):format(menuId, math.random())
    self.items = {}
    self.itemsManager = Items
    self.entityType = EntityType
    RegisterContext()
    ContextMenus[menuId] = self
    return self
end
