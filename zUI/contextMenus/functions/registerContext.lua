--- Registers the context menu focus toggle and key mapping.
--- Ensures focus handling is initialized only once.
function RegisterContext()
    if not focusIsHandled then
        focusIsHandled = true

        -- Registers a command to toggle zUI focus.
        RegisterCommand("zUI:RegisterContext", function()
            zUI.SetFocus(not zUI.IsFocused)
        end, false)

        -- Maps the focus toggle command to a keyboard key (default: Left Alt).
        RegisterKeyMapping(
            "zUI:RegisterContext",
            "Toggle zUI focus.",
            "keyboard",
            "LMENU" -- Left Alt
        )
    end
end
