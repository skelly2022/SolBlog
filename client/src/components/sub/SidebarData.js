import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SidebarData = [

    {
        title: "Home",
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: "Roadmap",
        path: '/roadmap',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: "Leaderboard",
        path: '/leaderboard',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
 
    {
        title: "Profile",
        path: '/profile',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: "Support",
        path: '/Support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
]