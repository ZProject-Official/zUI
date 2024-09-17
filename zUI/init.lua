RegisterNUICallback("zUI-GetTheme", function(data, cb)
    local Theme = json.decode(LoadResourceFile(GetCurrentResourceName(), "zUI/theme.json"))
    SendNUIMessage({
        action = "zUI-SetTheme",
        data = {
            theme = Theme
        }
    })
    cb("it's ok :)")
end)

RegisterNUICallback("zUI-ManageFocus", function(focus, cb)
    SetNuiFocus(focus, focus)
    cb("ok")
end)
