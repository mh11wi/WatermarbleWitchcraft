import { Fragment, useContext } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, ListSubheader, MenuItem } from '@mui/material';
import ColorPicker  from 'components/tool/ColorPicker';
import { pluck } from 'helpers/app';


const StepColors = (props) => {
  const { orientation, source, colors, setColors } = useContext(ToolContext);
  const numColors = colors.filter(color => color != null).length;
  const maxRows = Math.ceil(colors.length / 2);
  
  let numColumns = 1;
  if (orientation == 'landscape' && numColors > (maxRows - 1)) {
    numColumns = 2;
  }
  
  let options = [];
  pluck(source, 'b').forEach(brand => {
    options.push(<ListSubheader key={brand} color="primary" sx={{ fontWeight: 700 }}>{'- ' + brand + ' -'}</ListSubheader>)
    options.push(...source.filter(polish => polish.b == brand).map(polish => (
      <MenuItem key={polish.h} value={'#' + polish.h.toLowerCase()}>{polish.n}</MenuItem>
    )));
  });
  
  const getDisplay = (index) => {
    const color = colors[index];
    if (source.length && color != null) {
      return source.find(x => x.h.toLowerCase() == color.replace('#', ''))?.n || color;
    }
    return color;
  }
  
  const changeColor = (index, value) => {
    const array = [...colors];
    array[index] = value;
    setColors(array);
  }
  
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
      gridGap: '1rem',
      textAlign: 'center',
      pl: 4,
      width: {
        xs: '75%',
        sm: numColumns == 1 ? '50%' : '100%'
      }
    }}>
      {colors.map((color, index) => (
        <ColorPicker 
          key={index} 
          index={index} 
          color={color} 
          changeColor={changeColor} 
          getDisplay={getDisplay}
          hidden={index > numColors} 
          removable={index > 0 && index == numColors - 1}
          column={(numColumns == 1 || index < maxRows) ? 1 : 2}
          row={numColumns == 1 ? (index + 1) : (index % maxRows + 1)}
          options={options.length > 0 ? options : null}
        />
      ))}
    </Box>
  );
};

export default StepColors;
