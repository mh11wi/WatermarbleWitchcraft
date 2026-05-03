import { useContext, useState } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';


const images = import.meta.glob('/src/assets/*.png', {
  eager: true,
  import: 'default'
});

const models = [
  { label: 'Round', value: 'round' }, 
  { label: 'Square', value: 'square' }, 
  { label: 'Almond', value: 'almond' }, 
  { label: 'Squoval', value: 'squoval' }, 
];

const StepModel = (props) => {
  const { orientation, model, setModel } = useContext(ToolContext);
  const [loaded, setLoaded] = useState(false);
  
  const onChange = (event, value) => {
    setModel(value);
  }
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: orientation == 'landscape' ? 'row' : 'column', 
      justifyContent: orientation == 'landscape' ? 'center' : 'start', 
      alignItems: 'center',
      width: '100%',
      gap: orientation == 'landscape' ? 1 : 4,
      ml: orientation == 'landscape' ? 5 : 0
    }}>
      <FormControl sx={{ flexShrink: 0, visibility: loaded ? 'visible' : 'hidden'  }}>
        <RadioGroup
          name="model"
          value={model} 
          onChange={onChange}
          row={orientation == 'portrait'}
        >
          {models.map(model => (
            <FormControlLabel 
              key={model.value} 
              value={model.value} 
              control={<Radio />} 
              label={model.label} 
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ 
        maxWidth: orientation == 'landscape' ? '60vmin' : 'none', 
        maxHeight: orientation == 'landscape' ? 'none' : '55vmax',
        height: '100%', 
        aspectRatio: '1/1'
      }}>
        <img 
          alt={model} 
          src={images[Object.keys(images).find(x => x.includes(model))]} 
          onLoad={() => setLoaded(true)}
          style={{ width: '100%' }} 
        />
      </Box>
    </Box>
  );
};

export default StepModel;
