local function CheckVersion(repo)
    local ressource = GetInvokingResource() or GetCurrentResourceName()

    local versionActuelle = GetResourceMetadata(ressource, 'version', 0)

    if versionActuelle then
        versionActuelle = versionActuelle:match('%d+%.%d+%.%d+')
    end

    if not versionActuelle then
        return print(("^1Impossible de récupérer la version pour '%s' ^0"):format(ressource))
    end

    SetTimeout(1000, function()
        PerformHttpRequest(('https://api.github.com/repos/%s/releases/latest'):format(repo),
            function(statusCode, responseData)
                if statusCode ~= 200 then return end

                local data = json.decode(responseData)
                if data.prerelease then return end

                local versionDisponible = data.tag_name:match('%d+%.%d+%.%d+')
                if not versionDisponible or versionDisponible == versionActuelle then return end

                local va = { string.strsplit('.', versionActuelle) }
                local vd = { string.strsplit('.', versionDisponible) }

                for i = 1, #va do
                    local actuelle, dispo = tonumber(va[i]), tonumber(vd[i])

                    if actuelle ~= dispo then
                        if actuelle < dispo then
                            return print(('^3Nouvelle version disponible pour %s (version actuelle: %s)\r\n%s^0')
                                :format(ressource, versionActuelle, data.html_url))
                        else
                            break
                        end
                    end
                end
            end, 'GET')
    end)
end

CheckVersion("ZProject-Official/zUI")
