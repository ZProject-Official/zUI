--- Set the function to execute when the menu is opened.
---@param Event fun() @The function to execute
function zUI:OnOpen(Event)
    self.openingEvent = Event
end
