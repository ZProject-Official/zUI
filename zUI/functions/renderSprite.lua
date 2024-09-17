--- Afficher une image en dessous d'un menu.
---@param Image string @Lien de l'image à afficher.
function zUI.RenderSprite(Image)
    SendNUIMessage({
        action = "zUI-RenderSprite",
        data = {
            image = Image
        }
    })
end
