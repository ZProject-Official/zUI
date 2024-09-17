---@param Title string @Titre de l'input
---@param Subtitle string @Sous-titre de l'input
---@param Description string @Description
function zUI.AlertInput(Title, Subtitle, Description)
    local NuiResponse
    SendNUIMessage({
        action = "zUI-AlertInput",
        data = {
            Title = Title,
            Subtitle = Subtitle,
            Description = Description,
        }
    })
    SetNuiFocus(true, true)
    NuiResponse = nil
    local promise = promise.new()
    RegisterNUICallback('zUI-AlertResult', function(data, cb)
        NuiResponse = data.inputValue
        promise:resolve(NuiResponse)
        cb('ok')
    end)
    RegisterNUICallback('zUI-AlertCancel', function(data, cb)
        NuiResponse = nil
        promise:resolve(NuiResponse)
        cb('ok')
    end)
    Citizen.Wait(0)
    local response = Citizen.Await(promise)
    SetNuiFocus(false, false)
    return response
end
