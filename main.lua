local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "Voici la description",
    nil, "F1", "Ouvrir le Menu exemple.")
local subMenu = zUI.CreateSubMenu(Menu, "Titre", "Sous-Titre", "Voici la description")

local checkboxState = false
local percentage = 0
local index = 1
local colorListIndex = 1

Menu:SetItems(function(Items)
    Items:AddSeparator("Séparateur")
    Items:AddLine()
    Items:AddButton("Titre", "Je suis un bouton", {},
        function(onSelected, onHovered)

        end, subMenu)
    Items:AddLinkButton("Titre", "Je suis un bouton lien", {}, "https://zsquad.fr")
    Items:AddCheckbox("Titre", "Je suis une checkbox", checkboxState, {}, function(onSelected, onHovered)
        if onSelected then
            checkboxState = not checkboxState
        end
    end)
    Items:AddSlider("Titre", "Je suis un slider", percentage, 10, {},
        function(onSelected, onHovered, onChange, percentage)
            if onChange then
                percentage = percentage
            end
        end)
    Items:AddList("Titre", "Je suis une liste", index, { "Item #1", "Item #2" }, {},
        function(onSelected, onHovered, onListChange, i)
            if onListChange then
                index = i
            end
        end)
    Items:AddColorList("Titre", "C'est une liste de couleurs", colorListIndex,
        { "#00ff00", "#fffd2c", "#ff00ff", "#ff0000", "#0000ff" }, {},
        function(onSelected, onHovered, onListChange, index)
            if onListChange then
                colorListIndex = index
            end
        end)
end)

subMenu:SetItems(function(Items)
    Items:AddSeparator("Sous Menu", "right")
    Items:AddLine()
    Items:AddButton("Titre", "Je suis un bouton", {}, function(onSelected, onHovered)
        if onSelected then
            local value = zUI.ShowModal("Titre", {
                { type = "text",        name = "Text input",     description = "Input description", isRequired = false, minLength = 4, maxLength = 15 },
                { type = "number",      name = "Number input",   description = "Input description", isRequired = false },
                { type = "checkbox",    name = "Checkbox input", description = "Input description", defaultValue = true },
                { type = "colorpicker", name = "Color input",    defaultValue = "#faad2c" },
                { type = "date",        name = "Date input",     format = "DD/MM/YYYY" }
            }, {})
            print(value[1])
        end
    end)
    Items:AddButton("Titre", "Je suis un bouton", {}, function(onSelected, onHovered)
        if onHovered then
            zUI.ShowInfo("Titre", nil, {
                { "Titre", "Valeur" },
                { "Titre", "Valeur" },
                { "Titre", "Valeur" },
                { "Titre", "Valeur" },
            })
        end
    end)
end)

Menu:OnOpen(function()
    print("Menu open")
end)

subMenu:OnOpen(function()
    print("subMenu open")
end)

Menu:OnClose(function()
    print("Menu close")
end)

subMenu:OnClose(function()
    print("subMenu close")
end)

zUI.CreateContext("vehicle", function(Items, coords3D, Entity)
    Items:AddSeparator("vehicle")
end)

zUI.CreateContext("props", function(Items, coords3D, Entity)
    Items:AddSeparator("props")
end)

zUI.CreateContext("ped", function(Items, coords3D, Entity)
    Items:AddSeparator("ped")
end)

zUI.CreateContext("other", function(Items, coords3D, Entity)
    Items:AddSeparator("other")
end)

local coords = vector3(350.46109008789, 932.27905273438, 203.43138122559)

zUI.CreateContext(coords, function(Items, coords3D, Entity)
    Items:AddSeparator("vector")
end)

local withContext = true

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if #(coords - GetEntityCoords(PlayerPedId())) < 3 then
            if withContext then
                zUI.DisplayPulsingNotification("", "", coords, { IsDisabled = true })
            else
                zUI.DisplayPulsingNotification("E", "Intéragir", coords, {})
                if IsControlJustPressed(0, 51) then
                    zUI.SendNotification("Titre", "Vous avez appuyer sur E", {},
                        "https://i.postimg.cc/jSs6YGNh/ZProject-4.jpg",
                        "https://i.postimg.cc/pdrDpzsh/ZBanner-Paypal.png")
                end
            end
        end
    end
end)
