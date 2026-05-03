import { useState } from 'react';
import { MuiColorInput } from 'mui-color-input';
import { Box, Button, IconButton, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const ColorPicker = (props) => {
  const [open, setOpen] = useState(false);
  
  const handleClick = (event) => {
    if (props.options) {
      setOpen(true);
    } else {
      event.target.parentElement.querySelector('button').click();
    }
  }
  
  const handleChange = (value) => {
    props.changeColor(props.index, value);
  }
  
  const handleSelect = (event) => {
    setOpen(false);
    props.changeColor(props.index, event.target.value);
  }
  
  let content;
  if (props.color) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItmes: 'center', position: 'relative' }}>
        <MuiColorInput 
          format="hex" 
          isAlphaHidden="true" 
          disablePopover={props.options} 
          value={props.color} 
          onClick={handleClick} 
          onChange={handleChange}
          label={'Polish ' + (props.index + 1)}
          sx={{ flexGrow: props.options ? 1 : 0 }}
          slotProps={{ 
            input: { 
              readOnly: true, 
              value: props.getDisplay(props.index) 
            } 
          }}
        />
        {props.options && 
          <Select
            open={open}
            value={props.color}
            onChange={handleSelect}
            onClose={() => setOpen(false)}
            sx={{ position: 'absolute', visibility: 'hidden' }}
          >
            {props.options}
          </Select>
        }
        <IconButton 
          aria-label="Remove Polish" 
          color="primary" 
          onClick={() => handleChange(null)} 
          sx={{ visibility: props.removable ? 'visible' : 'hidden' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  } else {
    content = (
      <Button 
        variant="text"
        onClick={() => handleChange('#ffffff')}
        sx={{ mr: '50px' }}
      >
        + Add Polish
      </Button>
    );
  }
  
  return (
    <Box sx={{ 
      display: props.hidden ? 'none': 'block', 
      gridColumn: props.column,
      gridRow: props.row,
      "& .MuiInputBase-root, input": { cursor: 'pointer' },
      "& .MuiColorInput-Button": { cursor: 'pointer !important' }
    }}>
      {content}
    </Box>
  );
};

export default ColorPicker;
