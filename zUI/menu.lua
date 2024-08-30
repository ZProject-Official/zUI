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
---@field public onOpenEvent fun() @Function à éxécuter à l'ouverture
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
    self.Identifier = ("zUI-MenuIdentifier:%s"):format(#menus + 1)
    self.Title = Title
    self.Subtitle = Subtitle
    self.Key = Key
    self.Description = Description
    self.BannerUrl = BannerUrl
    self.Visible = false
    self.Priority = false
    self.Closable = true
    self.Items = {}
    function self.ItemsCreator() end
    function self.OnCloseEvent() end
    function self.OnOpenEvent() end

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
    self.Identifier = ("zUI-SubMenuIdentifier:%s"):format(#menus + 1)
    self.Parent = Parent
    self.Title = (Title or Parent.Title)
    self.Subtitle = (Subtitle or Parent.Subtitle)
    self.BannerUrl = (BannerUrl or Parent.BannerUrl)
    self.Priority = false
    self.Closable = true
    self.Items = {}
    function self.ItemsCreator() end
    function self.OnCloseEvent() end
    function self.OnOpenEvent() end

    menus[#menus + 1] = self
    return self
end

---@param Function fun(Function: zUI) @Function pour ajouter les Items
function zUI:SetItems(Function)
    self.ItemsCreator = Function
end

function zUI:CloseMenu()
    if not CurrentMenu then return end
    if CurrentMenu.Parent then
        CurrentMenu.Priority = false
        CurrentMenu.Parent.Priority = true
        CurrentMenu = CurrentMenu.Parent
        CurrentMenu:CloseMenu()
    else
        CurrentMenu.Visible = false
        CurrentMenu.Priority = false
        MenuIsVisible = false
        CurrentMenu.OnCloseEvent()
        CurrentMenu = nil
        SendNUIMessage({
            action = "zUI-SetVisible",
            data = {
                IsVisible = false,
            }
        })
    end
end

---@param IsVisible boolean @Visibilité du menu
function zUI:SetVisible(IsVisible)
    if IsVisible then
        self.OnOpenEvent()
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
            zUI:CloseMenu()
        end
    end
    self.Visible = IsVisible
    self.Priority = IsVisible
    MenuIsVisible = IsVisible
    if IsVisible then
        self:menuController()
        
        CreateThread(function()
            while self.Priority do
                self:hide(IsPauseMenuActive())
                Wait(150)
            end
        end)
    end
end

---@return boolean @Visibilité du menu
function zUI:IsVisible()
    return self.Visible
end

---@param Function fun() @Function à éxécuter à la fermeture
function zUI:OnClose(Function)
    self.OnCloseEvent = Function
end

---@param Function fun() @Function à éxécuter à l'ouverture
function zUI:OnOpen(Function)
    self.OnOpenEvent = Function
end

---@param Closable boolean @Le menu peut se fermer
function zUI:SetClosable(Closable)
    self.Closable = Closable
end

---@param hide status @Etat du menu
function zUI:hide(status)
    if status then
        SendNUIMessage({
            action = "zUI-ManageMenu",
            data = {
                IsVisible = false,
                Items = {}
            }
        })
    else
        self.Items = {}
        self.ItemsCreator(self)
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
    end
end

function zUI:menuController()
    Citizen.CreateThread(function()
        Wait(500)
        while self.Visible do
            if IsControlPressed(2, 172) then -- Arrow UP
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "up"
                    }
                })
                Wait(125)
            elseif IsControlPressed(2, 173) then -- Arrow DOWN
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "down"
                    }
                })
                Wait(125)
            elseif IsControlPressed(2, 174) then -- Arrow LEFT
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "left"
                    }
                })
                Wait(125)
            elseif IsControlPressed(2, 175) then -- Arrow RIGHT
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "right"
                    }
                })
                Wait(125)
            end

            if IsControlJustPressed(2, 191) or IsControlJustPressed(2, 201) then -- Enter
                SendNUIMessage({
                    action = "zUI-Interaction",
                    data = {
                        Type = "enter"
                    }
                })
            elseif IsControlJustPressed(2, 194) then -- Backspace
                if CurrentMenu.Parent then
                    CurrentMenu:GoBack()
                else
                    CurrentMenu:SetVisible(not CurrentMenu:IsVisible())
                end
            end
            Wait(0)
        end
    end)    
end

function zUI:GoBack()
    if not self.Parent then return end
    
    self.Priority = false
    self.Parent.Priority = true
    CreateThread(function()
        while self.Parent.Priority do
            self.Parent:hide(IsPauseMenuActive())
            Wait(150)
        end
    end)
    PlaySound("backspace")
end