--- Set the function to execute when the menu is closed.
---@param Event fun() @The function to execute
function zUI:OnClose(Event)
    self.closingEvent = Event
end
