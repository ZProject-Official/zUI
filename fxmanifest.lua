fx_version 'cerulean'
game "gta5"
lua54 "yes"

author "zSquad - Soren & Jules"
description "Un exemple de menu utilisant zUI | An example menu using zUI."

ui_page {
    "zUI/web/build/index.html"
}

client_scripts {
    "zUI/menu.lua",
    "zUI/utils/*.lua",
    "zUI/items/*.lua",
    "exemple.lua",
}

files {
    "zUI/web/build/index.html",
    'zUI/web/build/**/*'
}
