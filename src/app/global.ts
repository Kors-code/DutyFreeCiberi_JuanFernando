export var GLOBAL = {
    // url: '/api/', 
    url_app: 'http://localhost:1165/api/',
    // url_socket: 'ws://localhost:38081',
    // url_app: 'https://ciberi.co/api/',  
    url: 'https://ciberi.co/api/',
    url_socket: 'https://ciberi.co',
    // url: 'http://192.168.0.10/api/',
    // url_app: 'http://192.168.0.10/api/',
    // url_socket: 'http://localhost:38081',
    app:true,
    version:'1.1.1',
    company: 'ciberi.co'
}

// produccion max-size err;
// node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod --build-optimizer

// electron-packager . --platform=win32 --arch=x64 --icon=./build/DFP.png