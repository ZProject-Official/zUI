--- Updates the context menu based on the current cursor position and entity interaction.
--- Handles rendering, focus management, and interaction logic.
function UpdateContext()
    if #ContextMenus > 1 then
        -- Disable current NUI focus and activate the mouse cursor.
        SetNuiFocus(false, false)
        SetMouseCursorActiveThisFrame()

        -- Perform a screen-to-world raycast to detect entities and cursor position.
        local isFound, endCoords, surfaceNormal, entityHit, entityType, cameraDirection, mouse = Graphics
            .ScreenToWorld(35.0, 31)

        if entityType ~= 0 then
            -- Reset the alpha of the currently selected entity and update the current entity.
            if GetCurrentEntity() then
                ResetEntityAlpha(GetCurrentEntity())
                SetCurrentEntity(nil)
            end
            SetEntityAlpha(entityHit, 175, false)
            SetCurrentEntity(entityHit)
        else
            -- Clear current entity if no valid entity is found.
            ResetEntityAlpha(GetCurrentEntity())
            SetCurrentEntity(nil)
        end

        -- Play a sound for menu interaction feedback.
        PlaySound("enter")

        -- Determine the appropriate context menu index.
        local index = MenuItems(entityType == 0 and 4 or entityType, endCoords, entityHit)

        -- Update the context menu items and show the NUI focus.
        UpdateContextItems(index, mouse, endCoords, entityHit)
        SetMouseCursorVisible(false)
        SetNuiFocus(true, true)
    end
end
