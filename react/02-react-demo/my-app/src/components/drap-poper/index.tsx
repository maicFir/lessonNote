import React from 'react';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


function DrapPoper(props: any) {
    const { openMenu, anchorEl, child, handleColseMenu } = props;
    const [subPoper, setSubPoper] = React.useState(false);
    const useStyles = makeStyles((theme) => ({
        typography: {
          padding: theme.spacing(2),
        },
    }));
    const handleCloseClick = (v: any) => {
        if (Array.isArray(v.childrens) && v.childrens.length > 0) {

        } else {
            handleColseMenu();
        }
        
    }
    const classes = useStyles();
    const DrapPoperElem = () => <Popper
                id={ openMenu ? 'simple-popper' : ''}
                open={openMenu}
                anchorEl={anchorEl}
                transition
            >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                            {
                        child.length > 0 ? child.map((v: any, index: number) => <Typography key={ index } onClick={() => {
                                    handleCloseClick(v)
                        }} className={classes.typography}>{v.text}
                            { Array.isArray(v.childrens) && v.childrens.length > 0 ? (<ArrowForwardIosIcon style={{ position: 'relative', top: '0px', fontSize: '12px' }}></ArrowForwardIosIcon>) : null}
                        </Typography>) : null
                            }
                    </Paper>
                </Fade>
            )}
    </Popper>
    return <>
        <DrapPoperElem></DrapPoperElem>                
    </>
}

export default DrapPoper;