--- Play a sound based on the given type.
---@param Type string @The type of sound to play.
function PlaySound(Type)
    local audio
    if Type == "down" or Type == "up" or Type == "right" or Type == "left" then
        audio = "NAV_UP_DOWN"
    elseif Type == "enter" then
        audio = "SELECT"
    elseif Type == "backspace" then
        audio = "QUIT"
    elseif Type == "toggle" then
        audio = "TOGGLE_ON"
    end
    PlaySoundFrontend(-1, audio, "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
end

RegisterNUICallback("zUI-PlaySound", function(data, cb)
    PlaySound(data.Type)
    cb("ok")
end)
