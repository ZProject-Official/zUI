local Example = zUI.CreateMenu("Titre", "Sous-Titre", "F1", "Ce menu utilise le zUI.")

Example:SetComponents(function(Items)
    Items:AddSeparator("C'est un séparateur !")
    Items:AddLine({ "#ff0000", "#00ff00", "#0000ff" })
    Items:AddButton("Bouton", "C'est un bouton !",
        { RightLabel = "~g~500$", RightBadge = "CASH", LeftBadge = "BARBER_ICON_A" },
        function(onSelected, onHovered)
            if onSelected then
                print("Boutton cliqué !")
            end
        end)
    Items:AddCheckbox("Checkbox", "C'est une checkbox !", false, { Color = "#0000ff" },
        function(onSelected, isChecked, onHovered)
            if onSelected then
                if isChecked then
                    print("Je suis coché !")
                else
                    print("Je ne suis pas coché :'(")
                end
            end
        end)
    Items:AddList("Liste", "C'est une liste !", { "~r~0", "~b~1" }, {}, function(onSelected, onHovered, Index)
        if onSelected then
            print(("L'index %d est sélectionné !"):format(Index))
        end
    end)
end)
