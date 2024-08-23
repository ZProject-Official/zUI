---@param Title string @Titre de l'input
---@param Subtitle string @Sous-titre de l'input
---@param PlaceHolder string @PlaceHolder
---@param MaxStringLenght number @Nombre maximum de caractères
function zUI.KeyboardInput(Title, Subtitle, PlaceHolder, MaxStringLenght)
    local NuiResponse
    SendNUIMessage({
        action = "zUI-KeyboardInput",
        data = {
            Title = Title,
            Subtitle = Subtitle,
            Placeholder = PlaceHolder,
            MaxLength = MaxStringLenght,
            Color = Config.DefaultColor
        }
    })
    SetNuiFocus(true, true)
    NuiResponse = nil
    local promise = promise.new()
    RegisterNUICallback('zUI-KeyboardResult', function(data, cb)
        NuiResponse = data.inputValue
        promise:resolve(NuiResponse)
        SetNuiFocus(false, false)
        cb('ok')
    end)
    RegisterNUICallback('zUI-KeyboardCancel', function(data, cb)
        NuiResponse = nil
        promise:resolve(NuiResponse)
        SetNuiFocus(false, false)
        cb('ok')
    end)
    Citizen.Wait(0)
    return Citizen.Await(promise)
end
