# 🎮 **zUI - Bibliothèque de Menus NUI pour FiveM**

<div style="display: flex; justify-content: space-around;">
    <img src="https://i.imgur.com/mU2HFdM.png" alt="Image 1" style="border-radius: 1.5em"/>
    <img src="https://i.imgur.com/qCVE38h.png" alt="Image 2" style="border-radius: 1.5em"/>
</div>


## 💻 Code pour la deuxième image

```lua
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
    Items:AddCheckbox("Checkbox", "C'est une checkbox !", false, { color = "#0000ff" },
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
```

## 🚀 **Introduction**

**zUI** est une bibliothèque avancée pour la création de menus NUI dans FiveM. Conçue pour être **sobre**, **optimisée**, et **visuellement attrayante**, elle utilise **React** pour l'interface utilisateur, tout en vous permettant d'écrire vos scripts en **Lua**. Inspirée de RageUI, **zUI** apporte des fonctionnalités modernisées et une expérience utilisateur améliorée pour les joueurs de serveurs FiveM.

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

```bash
cd zUI
cd web
npm install && npm build
```
Ou installez la version **Release**

### 3. C'est déjà fini !

Félicitations, vous avez terminé l'installation et la configuration de **zUI** sur votre serveur FiveM ! 🚀

Maintenant que vous avez mis en place les bases, il est temps de vous amuser avec la personnalisation et de rendre vos menus aussi attractifs que fonctionnels.

## 🛠️ **Utilisation**

### Créer un Menu

Pour créer un menu avec **zUI**, utilisez la fonction `zUI.CreateMenu`. Voici un exemple de création de menu :

```lua
local zMenu = zUI.CreateMenu("Nom du Menu", "Description du menu", "Touche pour ouvrir le menu", "Ecriture dans le menu Fivem pour configurer la touche", "Entrez ici votre bannière")
```

### Ajouter des Éléments au Menu

Une fois le menu créé, vous pouvez ajouter des composants tels que des séparateurs, des lignes colorées, et des boutons interactifs.

```lua
zMenu:SetComponents(function(Menu)
    Menu:AddSeparator("Séparateur")
    Menu:AddLine({ "#FF0000", "#00FF00", "#0000FF" })  -- Ligne avec trois couleurs : Rouge, Vert, Bleu (Dégradé)
    Menu:AddButton("Nom du Bouton", "Description du Bouton", {} , -- Ajoutez du style !
        function(isClicked, isHovered)
            if (isClicked) then
                print("You clicked me!")
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

### [v1.0.0] - 2024-08-09
- Initial release avec support pour les menus personnalisés et les composants de base.

## 📬 **Support**

Pour toute question ou problème, rejoignez notre [Discord](https://discord.gg/ZGzmkMd4rs).

## 📜 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

*Merci d'avoir choisi **zUI** pour vos projets FiveM. Nous espérons que cette bibliothèque vous aidera à créer des menus NUI élégants et performants !*
