import { useContext, useRef, useState } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Save, Share } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import { isMobile } from 'helpers/app';
import { drawFlower } from 'helpers/math';


const images = import.meta.glob('/src/assets/*.png', {
  eager: true,
  import: 'default'
});

const StepFinish = (props) => {
  const { orientation, model, colors, coordinate } = useContext(ToolContext);
  const [loaded, setLoaded] = useState(false);
  const [save, setSave] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const canvasRef = useRef(null);
  const allColors = colors.filter(color => color != null);
  const query = `?model=${model}&colors=${allColors.map(c => c.replace('#', '')).join(',')}&coordinate=${coordinate.x + ',' + coordinate.y}`;
  const zoom = 3;
  
  const shareData = {
    title: "Watermarble Witchcraft",
    text: "Check out this watermarble manicure:",
    url: "https://mh11wi.github.io/WatermarbleWitchcraft" + query
  };
  
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
  
  const handleClickSave = () => {
    setSave(true);
    const target = document.getElementById('target');
    html2canvas(target, { 
      windowWidth: orientation == 'landscape' ? 2000 : 2200, 
      windowHeight: orientation == 'landscape' ? 2000 : 2200, 
      scale: 1 
    }).then((canvas) => {
      const link = document.createElement('a');
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      link.download = `watermarble_${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setTimeout(() => setSave(false), 1000);
    });
  }
  
  const getWatermarble = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    drawFlower(ctx, allColors, radius);
    return `url(${canvas.toDataURL()})`;
  }
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: orientation == 'landscape' ? 'row' : 'column', 
      justifyContent: orientation == 'landscape' ? 'center' : 'start', 
      alignItems: 'center',
      width: '100%',
      gap: orientation == 'landscape' ? 1 : 4,
      ml: orientation == 'landscape' ? 2 : 0
    }}>
      <ButtonGroup 
        size={orientation == 'landscape' ? 'medium' : 'large'}
        orientation={orientation == 'landscape' ? 'vertical' : 'horizontal'}
        sx={{ 
          alignItems: 'start', 
          gap: orientation == 'landscape' ? 2 : 4,
          flexShrink: 0, 
          visibility: loaded ? 'visible' : 'hidden',
          '& button': { border: 'none !important', p: 1 }, 
          '& .MuiButton-loadingIndicator': { left: 5 }
        }}
      >
        <Button 
          onClick={handleClickSave} 
          startIcon={<Save />}
          loading={save}
          loadingPosition="start"
        >
          Save Image
        </Button>
        { model != 'me' &&
          <Button onClick={handleClickShare} startIcon={<Share />}>
            Share Tool
          </Button>
        }
      </ButtonGroup>
      <ShareDialog
        open={shareOpen}
        onClose={handleCloseShare}
        data={shareData}
      />
      <Box id="target" sx={{ 
        maxWidth: orientation == 'landscape' ? '60vmin' : 'none', 
        maxHeight: orientation == 'landscape' ? 'none' : '55vmax',
        height: '100%', 
        aspectRatio: '1/1', 
        position: 'relative',
      }}>
        {loaded &&
          <Box sx={{ 
            position: 'absolute', 
            width: '33.5%', 
            height: '61%', 
            top: '3%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            background: getWatermarble(),
            backgroundPosition: `calc(50% + ${coordinate.x * 100 * zoom / 2}%) calc(50% + ${coordinate.y * 100 * zoom / 2}%)`,
            backgroundSize: `${(zoom + 0.5) * 100}%`,
            backgroundRepeat: 'no-repeat'
          }} />
        }
        <img 
          alt={model} 
          src={images[Object.keys(images).find(x => x.includes(model))]} 
          onLoad={() => setLoaded(true)}
          style={{ position: 'relative', width: '100%' }} 
        />
      </Box>
      <canvas ref={canvasRef} width="1000" height="1000" style={{
        width: 0, 
        height: 0,
        display: 'none'
      }} />
    </Box>
  );
};

export default StepFinish;
