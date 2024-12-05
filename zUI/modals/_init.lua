RegisterNUICallback("zUI-GetModalTheme", function(data, cb)
    local Theme = json.decode(LoadResourceFile(GetCurrentResourceName(), "zUI/modals/theme.json"))
    SendNUIMessage({
        action = "zUI-SetModalTheme",
        data = Theme
    })
    cb("it's ok :)")
end)
