local sounds = {
  ["down"] = "NAV_UP_DOWN",
  ["up"] = "NAV_UP_DOWN",
  ["left"] = "NAV_UP_DOWN",
  ["right"] = "NAV_UP_DOWN",
  ["enter"] = "SELECT",
  ["backspace"] = "QUIT",
  ["toggle"] = "TOGGLE_ON",
}

function PlaySound(Type)
    assert(sounds[Type], "Aucune son defini pour " .. Type)
    PlaySoundFrontend(-1, sounds[Type], "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
end

RegisterNUICallback("zUI-PlaySound", function(data, cb)
    PlaySound(data.Type)
    cb("ok")
end)
