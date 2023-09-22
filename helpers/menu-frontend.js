
const getMenuFrontend = (role = 'USER_ROLE') => {
    
    const menu = [
        {
          title: 'Principal!!!',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Dashboard', url: '/' },
            { title: 'Progressbar', url: 'progress' },
            { title: 'Gráficas', url: 'grafica1' },
            { title: 'Promesa', url: 'promesa' },
            { title: 'Rxjs', url: 'rxjs' },
          ],
        },
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Usuarios', url: 'usuarios' },
            { title: 'Hospitales', url: 'hospitales' },
            { title: 'Medicos', url: 'medicos' },
          ],
        }
      ];

      if ( role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' });
      }

      return menu;
}

module.exports = {
    getMenuFrontend
}