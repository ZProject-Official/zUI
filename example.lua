local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "https://i.ibb.co/z8TFzVq/banner.png", "F4", "Ouvrir le menu exemple.")
local SubMenu = zUI.CreateSubMenu(Menu, "Titre", "Sous-Titre", nil)

local CheckboxState = false

Menu:SetItems(function(Items)
    Items:AddSeparator("C'est un séparateur !")
    Items:AddLine({ "#ff0000", "#00ff00", "#0000ff" })
    Items:AddButton("Titre", "Description", { RightLabel = "RightLabel", LeftBadge = "MEDAL_GOLD" },
        function(onSelected, onHovered)
            if onSelected then
                zUI.KeyboardInput("Saisie de nom", "Veuillez entrer un nom", "Entrez un nom ici...", "", 25)
                print("J'ai été sélectionné !")
            end
        end, SubMenu)
    Items:AddCheckbox("Titre", "Description", CheckboxState, {}, function(onSelected, onHovered)
        if onSelected then
            CheckboxState = not CheckboxState -- Important ⚠️
        end
    end)
    Items:AddList("Titre", "Description", { "Item1", "Item2", "Item3", "Item4", "Item5" }, {},
        function(onSelected, onHovered, onListChange, index)
            if onSelected then
                print(("Je suis sur l'index ~#faad2c~%s"):format(index))
            end
        end)
    Items:AddLinkButton("Documentation", "Accéder à la ~#faa55c~documentation.", {}, "https://zsquad.fr")
end)

SubMenu:SetItems(function(Items)
    Items:AddButton("Retour", "Retourner au menu principal.", {}, function(onSelected, onHovered)
        if onSelected then
            SubMenu:Goback()
        end
    end)
end)
