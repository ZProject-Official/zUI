--- Show a modal.
---@param Title string @The title of the modal.
---@param Inputs { type: string, name: string, description: string, isRequired: string, minLength: string, maxLength: string, format: string, defaultValue: string } @The inputs of the modal.
---@param Styles { PrincipalColor: string } @The style of the modal.
function zUI.ShowModal(Title, Inputs, Styles)
    local NuiResponse
    SendNUIMessage({
        action = "zUI-ShowModal",
        data = {
            title = Title,
            inputs = Inputs,
            style = Styles
        }
    })
    SetNuiFocus(true, true)
    NuiResponse = nil
    local promise = promise.new()
    RegisterNUICallback('zUI-ModalResult', function(data, cb)
        NuiResponse = data.inputsValue
        promise:resolve(NuiResponse)
        cb('ok')
    end)
    RegisterNUICallback('zUI-ModalCancel', function(data, cb)
        NuiResponse = nil
        promise:resolve(NuiResponse)
        cb('ok')
    end)
    Citizen.Wait(0)
    local response = Citizen.Await(promise)
    SetNuiFocus(false, false)
    return response
end
