import React from "react";
import {
    NavLink,
    Outlet
} from "react-router-dom";
export const BaseLayOut = () => {
    return (<>
        <div className="nav-list">
            <NavLink to="/list">home</NavLink> |
            <NavLink to="/list/about">about</NavLink>
        </div>
        <div className="content">
            <Outlet />
        </div>
    </>)
}