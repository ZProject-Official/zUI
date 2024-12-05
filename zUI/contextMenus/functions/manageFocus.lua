local currentEntity

--- Retrieves the appropriate context menu index for a given entity type and position.
---@param entityType number @The type of entity being evaluated.
---@param endCoords vector3 @The 3D coordinates of the entity's end position.
---@param entityHit number @The entity hit by the raycast (if any).
---@return number @The index of the corresponding context menu, or -1 if no match is found.
function MenuItems(entityType, endCoords, entityHit)
    local menu = -1
    if entityType == 4 then
        for _, context in pairs(ContextMenus) do
            if type(context.entityType) == "vector3" then
                if #(GetEntityCoords(PlayerPedId()) - context.entityType) < 5 then
                    local context2DOnScreen, context2DX, context2DY = GetHudScreenPositionFromWorldPosition(
                        context.entityType.x,
                        context.entityType.y,
                        context.entityType.z
                    )
                    local endCoords2DOnScreen, endCoords2DX, endCoords2DY = GetHudScreenPositionFromWorldPosition(
                        endCoords.x,
                        endCoords.y,
                        endCoords.z
                    )
                    local distance2D = math.sqrt((endCoords2DX - context2DX) ^ 2 + (endCoords2DY - context2DY) ^ 2)
                    if distance2D <= 0.075 then
                        entityType = 5
                        break
                    end
                end
            end
        end
    end
    for index, context in pairs(ContextMenus) do
        if context.entityType == Entities[entityType] or type(context.entityType) == Entities[entityType] then
            menu = index
        end
    end
    return menu
end

--- Manages focus interactions for zUI.
function ManageFocus()
    Citizen.CreateThread(function()
        while zUI.IsFocused do
            Citizen.Wait(0)
            local controls_actions = { 239, 240, 24, 25 }
            DisableAllControlActions(2)
            SetMouseCursorActiveThisFrame()
            for _, control in ipairs(controls_actions) do
                EnableControlAction(0, control, true)
            end
            local isFound, endCoords, surfaceNormal, entityHit, entityType, cameraDirection, mouse = Graphics
                .ScreenToWorld(35.0, 31)
            if IsControlJustReleased(0, 24) then
                if #(GetEntityCoords(PlayerPedId()) - endCoords) > 10 then
                    entityType = 0
                end
                local index = MenuItems(entityType == 0 and 4 or entityType, endCoords, entityHit)
                if index ~= -1 then
                    PlaySound("enter")
                    SetMouseCursorVisible(false)
                    SetNuiFocus(true, true)
                    if entityType ~= 0 then
                        SetEntityAlpha(entityHit, 175, false)
                        currentEntity = entityHit
                    end
                    UpdateContextItems(index, mouse, endCoords, entityHit)
                end
            end
        end
        if currentEntity then
            ResetEntityAlpha(currentEntity)
            currentEntity = nil
            SendNUIMessage({
                action = "zUI-ManageContext",
                data = {
                    Visible = false
                }
            })
            SetNuiFocus(false, false)
        else
            SendNUIMessage({
                action = "zUI-ManageContext",
                data = {
                    Visible = false
                }
            })
            SetNuiFocus(false, false)
        end
    end)
end

--- Sets the current entity being interacted with.
---@param entity number @The entity to be set as the current entity.
function SetCurrentEntity(entity)
    currentEntity = entity
end

--- Retrieves the current entity being interacted with.
---@return number @The current entity.
function GetCurrentEntity()
    return currentEntity
end
