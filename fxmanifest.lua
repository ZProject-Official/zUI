fx_version "cerulean"
game "gta5"
lua54 "yes"

author "zSquad - Soren & Jules"
description "Un exemple de menu utilisant zUI | An example menu using zUI."
version "1.0.3"

ui_page "zUI/web/build/index.html"

client_scripts {
    "zUI/functions/*.lua",
    "zUI/menu.lua",
    "zUI/menuController.lua",
    "zUI/items/*.lua",
    "example.lua"
}

files {
    "zUI/web/build/index.html",
    "zUI/web/build/**/*"
}
