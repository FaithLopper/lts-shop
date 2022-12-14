import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { desktopRoutes,mobileRoutes } from './routes'
import TransitionRoute from './TransitionRoute'
import Utils from '../utils'

const AppRoutes = () => {
    const [passRequirements, setPassRequirements] = useState(false)
    const { isMobileDevice } = Utils
    useEffect(() => {
        // handle requirement (fetch user profile, ...)
        setPassRequirements(true)
    }, [])

    if (!passRequirements) {
        return null
    }


    return (
        <BrowserRouter>
            <TransitionRoute 
                routes={ isMobileDevice() ? mobileRoutes : desktopRoutes} 
            />
        </BrowserRouter>
    )
}

export default AppRoutes
