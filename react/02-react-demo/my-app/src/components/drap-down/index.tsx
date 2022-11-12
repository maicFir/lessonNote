

import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function DropDown(props: any) {
    const { data, extraProps, anchorEl, onClick, open} = props;
    const [anchorEl2, setAnchorEl2] = React.useState<any>(null);
    const [showPoper, setShowPoper] = React.useState(false)
    const [open2, setOpen2] = React.useState(false);
    const [child, setChild] = React.useState<any[]>([]);
    // 当前关闭下拉菜单点击
    const handleCloseClick = (event: any) => {
        onClick(event, open);
        setAnchorEl2(null);
        setOpen2(false);
        setShowPoper(false);
    }
    // 打开下一级菜单
    const handleOpenNextMenu = (e: any, children: any[]) => {
        if (children instanceof Array && children.length > 0) {
            setAnchorEl2(e.currentTarget);
            setOpen2(true);
            setChild(children);
            setShowPoper(true);
        } else {
            // 没有下一级
            setAnchorEl2(null);
            setOpen2(false);
            setAnchorEl2(null);
            setShowPoper(false);
            onClick(e, true);
        }
    }
    // 第二级菜单
    const handleCloseNext = () => {
        setAnchorEl2(null);
        setOpen2(false);
    }
    const DrapMenu = (props: any) => 
    <Menu
        className="lock-menu"
        open={open}
        variant="selectedMenu"
        onClose={handleCloseClick}
        anchorEl={anchorEl}
      >
        {props.data.map((item: any, index: number) => (
            <MenuItem
                key={index}
            >
                <span onClick={(e) => { handleOpenNextMenu(e, item[extraProps.children]) }}>
                    {item[extraProps.key]}
                    { Array.isArray(item[extraProps.children]) && item[extraProps.children].length > 0 ? (<ArrowForwardIosIcon style={{ position: 'relative', top: '0px', fontSize: '12px' }}></ArrowForwardIosIcon>) : null}
                </span>
                
            </MenuItem>
        ))}
    </Menu>
    const DrapPoper = () => {
        return <Popover
        anchorEl={anchorEl2}
        keepMounted
        open={open2}
        onClose={handleCloseNext}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        >
            <DrapMenu data={ child }></DrapMenu>
       </Popover> 
    }
    return (<>
        <DrapMenu data={ data }></DrapMenu>
        { child.length > 0 && showPoper ? <DrapPoper></DrapPoper> : null}
    </>)
}
export default DropDown