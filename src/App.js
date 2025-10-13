import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AdSense from 'react-adsense';
import MenuBar from 'components/menu/MenuBar';
import useWindowOrientation from 'hooks/useWindowOrientation';
import { isTouchDevice, getPageScale } from 'helpers/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'src/App.css';


const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};


function App() {
  const theme = useTheme();
  const { orientation, resizing } = useWindowOrientation();
  
  return (
    <Box className="App" sx={{ bgcolor: theme.palette.background.default, boxShadow: `inset 10000px 10000px ${theme.palette.action.hover}` }}>
      {orientation === 'landscape' && !resizing && 
        <Box className="vertical-ad-left">
          <AdSense.Google
            client="ca-pub-9808989635264198"
            slot="9091776362"
            style={adStyle}
            format=""
            responsive="true"
          />
        </Box>
      }
      <Box role="main" className="Main" sx={{ bgcolor: theme.palette.background.default }}>
		<MenuBar />
		<Typography sx={{ p: 2 }}>
          Coming Soon!
        </Typography>
      </Box>
      {orientation === 'landscape' && !resizing && 
        <Box className="vertical-ad-right">
          <AdSense.Google
            client="ca-pub-9808989635264198"
            slot="6465613026"
            style={adStyle}
            format=""
            responsive="true"
          />
        </Box>
      }
      {orientation === 'portrait' && !resizing && 
        <Box className="horizontal-ad">
          <AdSense.Google
            client="ca-pub-9808989635264198"
            slot="2074941876"
            style={adStyle}
            format=""
            responsive={getPageScale() == 1}
          />
        </Box>
      }
    </Box>
  );
}

export default App;
