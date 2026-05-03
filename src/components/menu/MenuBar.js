import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  AppBar, 
  IconButton, 
  Link, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { Info, Home } from '@mui/icons-material';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';


const MenuBar = (props) => {
  const theme = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  
  const handleClickHelp = () => {
    setHelpOpen(true);
  }
  
  const handleCloseHelp = () => {
    setHelpOpen(false);
  }
  
  return (
    <AppBar position="relative" sx={{ 
      background: `
        linear-gradient(to top, ${theme.palette.primary.main}, black), 
        linear-gradient(to right, black, ${theme.palette.secondary.main} 167%)
      `,
      backgroundBlendMode: 'difference'
    }}>
      <Toolbar variant="dense">
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 500, 
            flexGrow: 1, 
            fontFamily: '"Cinzel Decorative", serif', 
            fontSize: '1.33rem',
            position: 'relative',
            "&::before": {
              content: '"✦"',
              position: "absolute",
              top: "-0.5em", 
              left: "-1.2em",
              fontSize: "0.7rem",
              opacity: 0.8,
              animation: "twinkle 2s infinite ease-in-out",
            },
            "&::after": {
              content: '"✦"',
              position: "absolute",
              top: "1.5em",
              fontSize: "0.7rem",
              opacity: 0.8,
              animation: "twinkle 2s infinite ease-in-out",
              animationDelay: "0.5s"
            },
            "@keyframes twinkle": {
              "0%, 100%": {
                opacity: 0.2,
                transform: "scale(0.9)",
              },
              "50%": {
                opacity: 1,
                transform: "scale(1.2)",
              }
            }
          }}
        >
          Watermarble Witchcraft
        </Typography>

        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Info />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
        />
		
        <Link href="https://mh11wi.github.io" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton aria-label="Home" color="inherit">
            <Home />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
