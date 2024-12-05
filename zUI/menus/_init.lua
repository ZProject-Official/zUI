RegisterNUICallback("zUI-GetMenuTheme", function(data, cb)
    local Theme = json.decode(LoadResourceFile(GetCurrentResourceName(), "zUI/menus/theme.json"))
    SendNUIMessage({
        action = "zUI-SetMenuTheme",
        data = Theme
    })
    cb("it's ok :)")
end)
