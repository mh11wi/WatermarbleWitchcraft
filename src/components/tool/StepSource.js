import { useContext } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Collections, Palette } from '@mui/icons-material';


const StepSource = (props) => {
  const { source, setSource } = useContext(ToolContext);
  
  const onChange = (event, value) => {
    if (value == 'data') {
      setSource(props.data);
    } else if (value == 'all') {
      setSource([]);
    }
  }
  
  return (
    <ToggleButtonGroup 
      color="primary" 
      value={source.length > 0 ? 'data' : 'all'} 
      onChange={onChange}
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiToggleButton-root': {
          width: '45%',
          height: '100%',
          maxHeight: '45vmin',
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1
        }
      }}
      aria-label="Source" 
      exclusive
    >
      <ToggleButton value="data">
        <Collections />
        My collection
      </ToggleButton>
      <ToggleButton value="all">
        <Palette />
        Any hex value
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default StepSource;
