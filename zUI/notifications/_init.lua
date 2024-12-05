RegisterNUICallback("zUI-GetNotifsTheme", function(data, cb)
    local Theme = json.decode(LoadResourceFile(GetCurrentResourceName(), "zUI/notifications/theme.json"))
    SendNUIMessage({
        action = "zUI-SetNotifsTheme",
        data = Theme
    })
    cb("it's ok :)")
end)
