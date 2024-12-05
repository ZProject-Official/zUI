local isUpdating = false

--- Updates the context menu items dynamically while the menu is active.
---@param MenuIndex number @The index of the context menu to update.
---@param mouse table @The current mouse position with `x` and `y` coordinates.
---@param endCoords vector3 @The 3D coordinates of the raycast endpoint.
---@param entityHit number @The entity hit by the raycast (if any).
function UpdateContextItems(MenuIndex, mouse, endCoords, entityHit)
    -- Prevent overlapping updates by delaying and resetting the state.
    if isUpdating then
        isUpdating = false
        Wait(75)
    end

    isUpdating = true

    -- Start a thread to manage dynamic updates to the context menu.
    Citizen.CreateThread(function()
        while zUI.IsFocused and isUpdating do
            Wait(75)

            -- Fetch the context menu and reset its items.
            local context = ContextMenus[MenuIndex]
            local items = {}
            context.items = {}

            -- Populate the context menu items via the manager callback.
            context.itemsManager(context, endCoords, entityHit)
            for _, item in pairs(context.items) do
                table.insert(items, item)
            end

            -- Send the updated context menu data to the NUI.
            SendNUIMessage({
                action = "zUI-ManageContext",
                data = {
                    Visible = true,
                    Position = {
                        x = mouse.x,
                        y = mouse.y
                    },
                    Items = items
                }
            })
        end

        -- Reset the update state and hide the menu when the loop ends.
        isUpdating = false
        SendNUIMessage({
            action = "zUI-ManageContext",
            data = {
                Visible = false
            }
        })
    end)
end
