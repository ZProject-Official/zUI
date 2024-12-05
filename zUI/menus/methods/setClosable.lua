---@param isClosable boolean @The closability state of the menu.
function zUI:SetClosable(isClosable)
    self.closable = isClosable
    return isClosable
end
