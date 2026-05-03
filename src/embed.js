import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tool from 'components/tool/Tool';
import 'src/embed.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#f06292'
    }
  }
});

let data;
const params = new URLSearchParams(window.location.search);
try {
  data = JSON.parse(atob(params.get('d')));
} catch (error) {
  console.log(error.message);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Tool sourceData={data} skipModel />
  </ThemeProvider>
);
