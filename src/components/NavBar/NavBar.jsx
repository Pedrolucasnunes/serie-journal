import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { LocalMovies, Info, PlaylistAdd, List } from '@mui/icons-material';

function NavBar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Página Inicial', icon: <LocalMovies /> },
    { path: '/sobre', label: 'Sobre', icon: <Info /> },
    { path: '/cadastrar', label: 'Cadastrar Séries', icon: <PlaylistAdd /> },
    { path: '/listar', label: 'Lista de Séries', icon: <List /> },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 0, 
            mr: 4,
            fontWeight: 'bold'
          }}
        >
          🎬 Series Journal
        </Typography>
        
        <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: 'white',
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                borderRadius: 2,
                px: 2,
                py: 1,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;