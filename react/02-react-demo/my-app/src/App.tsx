import React from 'react';
import logo from './logo.svg';
import './App.css';
import Resize from '../src/components/resize'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import DrapDown from '../src/components/drap-down';
const options = [
    {
        text: 'hello111',
        childrens: [
            {
                text: '1-1',
                childrens: [
                    {
                        text: '1-1-1'
                    },
                    {
                        text: '1-1-2'
                    }
            ] },
            {text: '1-2'}
        ]
    },
    {
        text: 'hello222',
        childrens: [
            { text: '2-1' },
            {text: '2-2'}
        ]
    },
    {
        text: 'hello333',
        childrens: []
    },
    {
        text: 'hello444',
        childrens: []
    },
  ];
function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClick = (event: any, bool: Boolean = false) => {
        setAnchorEl(event.currentTarget)
        setOpen(!bool)
    }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
          <Resize />
          <Button onClick={handleClick} >
                打开下拉
          </Button>
          <DrapDown
              onClick={(e: any, bool: Boolean) => {
                    handleClick(e, bool)
              }}
              open={open}
              data={options}
              anchorEl={anchorEl}
              extraProps={{ key: 'text', children: 'childrens' }}>
          </DrapDown>
    </div>
  );
}

export default App;
