fx_version "cerulean"
game "gta5"
lua54 "yes"

author "zSquad - Soren & Jules"
description "zUI is an advanced library for creating NUI menus in FiveM, combining simplicity, optimization, and aesthetics. Built with React for the interface and Lua for scripting, it modernizes and simplifies menu creation, drawing inspiration from RageUI while enhancing the user experience."
version "1.0.6"
repository "https://github.com/ZProject-Official/zUI"

files {
    "zUI/menus/theme.json",
    "zUI/notifications/theme.json",
    "zUI/contextMenus/theme.json",
    "zUI/modals/theme.json",
    "zUI/user-interface/build/index.html",
    "zUI/user-interface/build/**/*"
}

ui_page "zUI/user-interface/build/index.html"

client_scripts {
    -- [[zUI]]
    "zUI/*.lua",
    "zUI/items/*.lua",
    "zUI/menus/_init.lua",
    "zUI/menus/menu.lua",
    "zUI/menus/methods/*.lua",
    "zUI/menus/functions/*.lua",
    "zUI/notifications/*.lua",
    "zUI/contextMenus/components/*.lua",
    "zUI/contextMenus/*.lua",
    "zUI/contextMenus/functions/*.lua",
    "zUI/modals/*.lua",
    -- [[Script]]
    "main.lua"
}
