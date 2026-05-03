import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, lightGreen } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import AdSense from 'react-adsense';
import MenuBar from 'components/menu/MenuBar';
import Tool from 'components/tool/Tool';
import useWindowOrientation from 'hooks/useWindowOrientation';
import { isTouchDevice, getPageScale } from 'helpers/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/cinzel-decorative/700.css';
import '@fontsource/cinzel-decorative/900.css';
import 'src/App.css';


const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[700]
      },
      secondary: {
        main: lightGreen['A700']
      }
    },
  });
  const { orientation, resizing } = useWindowOrientation();
  
  return (
    <ThemeProvider theme={theme}>
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
          <Tool />
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
    </ThemeProvider>
  );
}

export default App;
