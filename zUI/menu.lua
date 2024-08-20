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
---@field public Parent zUI @Parent du submenu
zUI = {}
zUI.__index = zUI
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
    self.Items = {}
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
    self.Items = {}
    return self
end

---@param Items fun(Items: zUI) @Function pour ajouter les Items
function zUI:SetItems(Items)
    Citizen.CreateThread(function()
        local Delay = 500
        while true do
            Wait(Delay)
            if self.Priority then
                Delay = 100
                self.Items = {}
                Items(self)
                SendNUIMessage({
                    action = "zUI-SetItems",
                    data = {
                        Items = self.Items,
                        Title = self.Title,
                        Subtitle = self.Subtitle,
                        Banner = self.BannerUrl,
                    }
                })
                CurrentMenu = self
            end
        end
    end)
end

---@param IsVisible boolean @Visibilité du menu
function zUI:SetVisible(IsVisible)
    self.Visible = IsVisible
    self.Priority = IsVisible
    MenuIsVisible = IsVisible
    if IsVisible then
        SendNUIMessage({
            action = "zUI-SetVisible",
            data = {
                IsVisible = IsVisible,
                Title = self.Title,
                Subtitle = self.Subtitle,
                Banner = self.BannerUrl,
            }
        })
    else
        CurrentMenu = nil
        SendNUIMessage({
            action = "zUI-SetVisible",
            data = {
                IsVisible = IsVisible,
            }
        })
    end
end

---@return boolean @Visibilité du menu
function zUI:IsVisible()
    return self.Visible
end
