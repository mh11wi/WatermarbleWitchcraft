import { useState } from 'react';
import { 
  AppBar, 
  IconButton, 
  Link, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { 
  Info,
  Home,
  Share 
} from '@mui/icons-material';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import { isMobile } from 'helpers/app';


const MenuBar = (props) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const shareData = {
    title: "Watermarble Witchcraft",
    text: "Check out this watermarble tool for manicures:",
    url: "https://mh11wi.github.io/WatermarbleWitchcraft"
  };
  
  const handleClickHelp = () => {
    setHelpOpen(true);
  }
  
  const handleCloseHelp = () => {
    setHelpOpen(false);
  }
  
  const handleClickShare = async () => {
    if (!isMobile()) {
      setShareOpen(true);
    } else {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setShareOpen(true);
        }
      }
    }
  }
  
  const handleCloseShare = () => {
    setShareOpen(false);
  }
  
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Watermarble Witchcraft
        </Typography>

		<IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Info />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
        />

        <IconButton aria-label="Share" onClick={handleClickShare} color="inherit">
          <Share />
        </IconButton>
        <ShareDialog
          open={shareOpen}
          onClose={handleCloseShare}
          data={shareData}
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