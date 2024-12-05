Entities = {
    "ped",
    "vehicle",
    "props",
    "other",
    "vector3"
}

focusIsHandled = false

RegisterNUICallback("zUI-DisableFocus", function(data, cb)
    SetNuiFocus(false, false)
    zUI.IsFocused = false
    cb("ok")
end)

RegisterNUICallback("zUI-UpdateContext", function(data, cb)
    UpdateContext()
    cb("ok")
end)


RegisterNUICallback("zUI-GetContextTheme", function(data, cb)
    local Theme = json.decode(LoadResourceFile(GetCurrentResourceName(), "zUI/contextMenus/theme.json"))
    SendNUIMessage({
        action = "zUI-SetContextTheme",
        data = Theme
    })
    cb("it's ok :)")
end)
