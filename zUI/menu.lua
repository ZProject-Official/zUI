---@class zUI
---@field public Identifier string @Identifiant du menu
---@field public Title string @Titre du menu
---@field public Subtitle string @Sous-titre du menu
---@field public Key string | nil @Touche défini pour ouvrir le menu
---@field public Description string | nil @Description du menu
---@field public BannerUrl string | nil @Url de la bannière du menu
---@field public Visible boolean @Visibilité du menu
---@field public Priority boolean @Priorité du menu
---@field public Items table @Items du menu
---@field public OnCloseEvent fun() @Function à éxécuter à la fermeture
---@field public Closable boolean @Le menu peut se fermer
---@field public Parent zUI @Parent du submenu
zUI = {}
zUI.__index = zUI

local menus = {}
MenuIsVisible = false
CurrentMenu = nil

---@param Title string @Titre du menu
---@param Subtitle string @Sous-titre du menu
---@param Key string | nil @Touche défini pour ouvrir le menu
---@param Description string | nil @Description du menu
---@param BannerUrl string | nil @Url de la bannière du menu
function zUI.CreateMenu(Title, Subtitle, Key, Description, BannerUrl)
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.Identifier = ("zUI-MenuIdentifier:%s"):format(math.random())
    self.Title = Title
    self.Subtitle = Subtitle
    self.Key = Key
    self.Description = Description
    self.BannerUrl = BannerUrl
    self.Visible = false
    self.Priority = false
    self.Closable = true
    self.Items = {}
    function self.OnCloseEvent()

    end

    menus[#menus + 1] = self
    RegisterMenu(self)
    return self
end

---@param Parent zUI @Parent du submenu
---@param Title string @Titre du submenu
---@param Subtitle string @Sous-titre du submenu
---@param BannerUrl string | nil @Url de la bannière du submenu
function zUI.CreateSubMenu(Parent, Title, Subtitle, BannerUrl)
    ---@type zUI
    local self = setmetatable({}, zUI)
    self.Identifier = ("zUI-SubMenuIdentifier:%s"):format(math.random())
    self.Parent = Parent
    self.Title = Title
    self.Subtitle = Subtitle
    self.BannerUrl = BannerUrl
    self.Priority = false
    self.Closable = true
    self.Items = {}
    function self.OnCloseEvent()

    end

    menus[#menus + 1] = self
    return self
end

---@param Items fun(Items: zUI) @Function pour ajouter les Items
function zUI:SetItems(Items)
    Citizen.CreateThread(function()
        local Delay = 500
        while true do
            Wait(Delay)
            if self.Priority then
                if not IsPauseMenuActive() then
                    Delay = 100
                    self.Items = {}
                    Items(self)
                    SendNUIMessage({
                        action = "zUI-ManageMenu",
                        data = {
                            IsVisible = true,
                            Items = self.Items,
                            Title = self.Title,
                            Subtitle = self.Subtitle,
                            Banner = self.BannerUrl,
                        }
                    })
                    CurrentMenu = self
                else
                    SendNUIMessage({
                        action = "zUI-ManageMenu",
                        data = {
                            IsVisible = false,
                            Items = {}
                        }
                    })
                end
            end
        end
    end)
end

---@param IsVisible boolean @Visibilité du menu
function zUI:SetVisible(IsVisible)
    if IsVisible then
        for _, menu in pairs(menus) do
            menu.Priority = false
        end
        SendNUIMessage({
            action = "zUI-SetVisible",
            data = {
                IsVisible = IsVisible,
                Title = self.Title,
                HoverType = Config.HoverType,
                Subtitle = self.Subtitle,
                Banner = self.BannerUrl,
            }
        })
    else
        if CurrentMenu.Closable then
            CurrentMenu.OnCloseEvent()
            CurrentMenu = nil
            SendNUIMessage({
                action = "zUI-SetVisible",
                data = {
                    IsVisible = IsVisible,
                }
            })
        end
    end
    self.Visible = IsVisible
    self.Priority = IsVisible
    MenuIsVisible = IsVisible
end

---@return boolean @Visibilité du menu
function zUI:IsVisible()
    return self.Visible
end

---@param Function fun() @Function à éxécuter à la fermeture
function zUI:OnClose(Function)
    self.OnCloseEvent = Function
end

---@param Closable boolean @Le menu peut se fermer
function zUI:SetClosable(Closable)
    self.Closable = Closable
end
