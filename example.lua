local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "F1", "Ouvrir le menu exemple.", "https://i.ibb.co/z8TFzVq/banner.png")
local SubMenu = zUI.CreateSubMenu(Menu, "Titre", "Sous-Titre")

local CheckboxState = false

Menu:SetItems(function(Items)
    Items:AddSeparator("C'est un séparateur")
    Items:AddLine({ "#ff0000", "#00ff00", "#0000ff" })
    Items:AddButton("Bouton", "Accéder au submenu.", { RightLabel = "→" }, function(onSelected, onHovered)
    end, SubMenu)
    Items:AddCheckbox("Checkbox", "Gérer l'êtat de la checkbox.", CheckboxState, { LeftBadge = "CASH" },
        function(onSelected, onHovered, isChecked)
            if onSelected then
                CheckboxState = isChecked
            end
        end)
    Items:AddList("Liste", "Choisir entre le ~#faccdd~KeyboardInput~s~ et le ~#dcc789~AlertInput~s~.",
        { "KeyboardInput", "AlertInput" }, {}, function(onSelected, onHovered, onListChange, index)
            if onSelected then
                if index == 1 then
                    local value = zUI.KeyboardInput("Titre", "Sous-titre", "Placeholder", 50)
                    print(value)
                else
                    local value = zUI.AlertInput("Titre", "Sous-titre", "Le zUI est la meilleur librairie ?")
                    print(value)
                end
            end
        end)
end)

Menu:OnOpen(function()
    print("Je suis ouvert !")
end)

Menu:OnClose(function()
    print("Je suis fermé !")
end)

SubMenu:SetItems(function(Items)
    Items:AddSeparator("Je suis le submenu :)")
    Items:AddButton("Retour", "Retour au menu principal.", {}, function(onSelected, onHovered)
        if onSelected then
            Items:GoBack()
        end
    end)
    Items:AddButton("Fermer", "Fermer le menu.", {}, function(onSelected, onHovered)
        if onSelected then
            zUI:CloseMenu()
        end
    end)
end)
