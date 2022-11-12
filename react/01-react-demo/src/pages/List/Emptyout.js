/*
 * @Author: maicFir mcodes@163.com
 * @Date: 2022-10-31 21:31:04
 * @LastEditors: maicFir mcodes@163.com
 * @LastEditTime: 2022-11-12 13:37:53
 * @FilePath: /lessonNote/react/01-react-demo/src/pages/List/Emptyout.js
 * @Description: 
 */

import React from "react";
import Style from './index.module.scss'
import {
    NavLink,
    Outlet
} from "react-router-dom";
export const BaseLayOut = () => {
    return (<>
        <div className={Style['nav-list']}>
            <NavLink to="/list">home</NavLink> |
            <NavLink to="/list/about">about</NavLink>|
            <NavLink to="/list/resize">resize</NavLink>
        </div>
        <div className="content">
            <Outlet />
        </div>
    </>)
}