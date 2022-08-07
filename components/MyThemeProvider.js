
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '../theme';
import useSettings from '../hooks/useSettings';

function MyThemeProvider({ children }) {
  const { settings } = useSettings();
  console.log(settings);
  const theme = createTheme({ theme: settings.theme });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MyThemeProvider;