fx_version "cerulean"
game "gta5"
lua54 "yes"

author "zSquad - Soren & Jules"
description "zUI est une bibliothèque avancée pour créer des menus NUI dans FiveM, alliant sobriété, optimisation et esthétique. Basée sur React pour l'interface et Lua pour les scripts, elle modernise et simplifie la création de menus, s'inspirant de RageUI tout en améliorant l'expérience utilisateur."
version "1.0.5"
repository "https://github.com/ZProject-Official/zUI"

ui_page "web/build/index.html"

files {
    "theme.json",
    "web/build/index.html",
    "web/build/**/*"
}

client_scripts {
    -- Fichiers zUI
    "init.lua",
    "menu.lua",
    "methods/*.lua",
    "functions/*.lua",
    "items/*.lua",
    -- Vos fichiers
    "example.lua"
}

server_scripts {
    -- Gestion de la version
    "version.lua",
}
