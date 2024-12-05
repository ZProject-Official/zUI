--- Apply a new theme.
---@param theme {} @The theme to apply.
function zUI.ApplyTheme(theme)
    SendNUIMessage({
        action = "zUI-SetTheme",
        data = theme
    })
end
