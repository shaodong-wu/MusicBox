import React from 'react';
import { Redirect } from "react-router-dom";

const DDMainList = React.lazy(_ => import("../pages/app-center/main-list"));
const DDSongSheet = React.lazy(_ => import("../pages/app-center/song-sheet"));


const routes = [
    {
        path: "/",
        exact: true,
        render: () => (
            <Redirect to="/playing" />
        )
    },
    {
        path: "/playing",
        exact: true,
        component: DDMainList
    },
    {
        path: "/sheet",
        component: DDSongSheet,
        routes: [
            
        ]
    }
];

export default routes;