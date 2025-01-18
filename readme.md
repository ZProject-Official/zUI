# 🎮 **zUI - Bibliothèque de Menus NUI pour FiveM**

## [Documentation](https://zsquad.fr/docs/category/zui)

<div style="display: flex; justify-content: space-around;">
    <img src="https://i.imgur.com/ExrIhZQ.png" alt="Image 1" style="border-radius: 1.5em"/>
    <img src="https://i.imgur.com/KD99Jrw.png" alt="Image 2" style="border-radius: 1.5em"/>
</div>

## 💻 Exemple de Code Illustré

```lua
local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "Voici la description", nil, "F1", "Ouvrir le Menu exemple.")
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
```

## 🚀 **Introduction**

**zUI** est une bibliothèque avancée pour la création de menus NUI dans FiveM. Conçue pour être **sobre**, **optimisée**, et **visuellement attrayante**, elle utilise **React** pour l'interface utilisateur, tout en vous permettant d'écrire vos scripts en **Lua**. Inspirée de RageUI, **zUI** apporte des fonctionnalités modernisées, une expérience utilisateur améliorée et simplifie considérablement l'accès à la création de menus pour les développeurs.

## 🌟 **Caractéristiques Principales**

- **🔧 Simplicité d'Utilisation** : Interface claire et intuitive pour une intégration facile dans vos scripts Lua.
- **⚡ Performance Supérieure** : Construit avec des technologies modernes pour des performances optimales.
- **💻 Interface Moderne** : Utilise React pour des menus plus réactifs et fluides.
- **🎨 Personnalisation Avancée** : Ajustez les couleurs, le texte et le comportement des éléments de menu à votre guise.

## 📋 **Installation**

### 1. Cloner le Dépôt

```bash
git clone https://github.com/ZProject-Official/zUI.git
```

### 2. Installer les Dépendances

Naviguez dans le répertoire cloné et installez les dépendances nécessaires pour React.

- Veillez à bien avoir [Node.js](https://nodejs.org/fr) sur votre machine.

```bash
cd zUI
cd user-interface
npm install && npm run build
```

Ou installez la version **Release**

### 3. C'est déjà fini !

Félicitations, vous avez terminé l'installation et la configuration de **zUI** sur votre serveur FiveM ! 🚀

Maintenant que vous avez mis en place les bases, il est temps de vous amuser avec la personnalisation et de rendre vos menus aussi attractifs que fonctionnels.

## 🛠️ **Utilisation**

### Créer un Menu

Pour créer un menu avec **zUI**, utilisez la fonction `zUI.CreateMenu`. Voici un exemple de création de menu :

```lua
local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "Voici la description", nil, "F1", "Ouvrir le Menu exemple.")
```

### Ajouter des Éléments au Menu

Une fois le menu créé, vous pouvez ajouter des composants tels que des séparateurs, des lignes colorées, et des boutons interactifs.

```lua
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
```

## ❓ **FAQ**

**Q : Comment puis-je changer la touche d'ouverture du menu ?**  
R : Vous pouvez définir la touche d'ouverture lors de la création du menu via le paramètre dédié, ou via la configuration de votre ressource.

**Q : Puis-je utiliser zUI avec d'autres scripts ?**  
R : Absolument, **zUI** est conçu pour être entièrement compatible avec d'autres scripts Lua pour FiveM.

## 📝 **Changelog**

### [v1.0.0] - 2024-08-10

- Initial release avec support pour les menus personnalisés et les composants de base.

### [v1.0.1] - 2024-08-13

- Correction de différents problèmes.

### [v1.0.2] - 2024-08-18

- Refonte totale de la partie back-end.

### [v1.0.3] - 2024-08-23

- Ajouts de différentes features (keyboardInput, Closable, OnClose, OnListChange, Arrows, Checkbox Icon, Config).

### [v1.0.4] - 2024-08-26

- Ajouts de différentes features (AlertInput, Couleurs personnalisés `~#faad2c~`, Animations, Scrool de façon smooth, Optimisation de la navigation, Hover configurable, Auto focus dans le keyboardInput).

### [v1.0.5] - 2024-09-17

- Refonte totale. Ajout de différentes features (HelpNotification, RenderSprite, LinkButton, CloseAll, Theme.json, Badges Personnalisés, Documentation, Optimisation, Position des séparateurs)

### [v1.0.6] - 2024-12-05

- Refonte totale. Ajout de différentes features (HelpNotification, PulsingNotifications, Notifications, ContextUI, ColorList, Slider, Info, Modal, Themes, ApplyTheme)

## 📬 **Support**

Pour toute question ou problème, rejoignez notre [Discord](https://discord.gg/ZGzmkMd4rs).

## 📜 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

_Merci d'avoir choisi **zUI** pour vos projets FiveM. Nous espérons que cette bibliothèque vous aidera à créer des menus NUI élégants et performants !_
