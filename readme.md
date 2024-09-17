# 🎮 **zUI - Bibliothèque de Menus NUI pour FiveM**

## [Documentation](https://zsquad.fr/docs/category/zui)

<div style="display: flex; justify-content: space-around;">
    <img src="https://i.imgur.com/ExrIhZQ.png" alt="Image 1" style="border-radius: 1.5em"/>
    <img src="https://i.imgur.com/KD99Jrw.png" alt="Image 2" style="border-radius: 1.5em"/>
</div>

## 💻 Exemple de Code Illustré

```lua
local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "https://i.ibb.co/z8TFzVq/banner.png", "F1", "Ouvrir le menu exemple.")
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


Menu:OnOpen(function()
    print("Je suis ouvert !")
end)

Menu:OnClose(function()
    print("Je suis fermé !")
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
cd web
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
local Menu = zUI.CreateMenu("Titre", "Sous-Titre", "Url de votre bannière", "F1", "Ouvrir le menu exemple.")
```

### Ajouter des Éléments au Menu

Une fois le menu créé, vous pouvez ajouter des composants tels que des séparateurs, des lignes colorées, et des boutons interactifs.

```lua
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

## 📬 **Support**

Pour toute question ou problème, rejoignez notre [Discord](https://discord.gg/ZGzmkMd4rs).

## 📜 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

_Merci d'avoir choisi **zUI** pour vos projets FiveM. Nous espérons que cette bibliothèque vous aidera à créer des menus NUI élégants et performants !_
