//APP demo CaliJS
class Config {
    
    /**
     * @constructor Constructor de la clase Config, en la fase de configuración, 
     * angular solo recibe providers, y los providers no pueden ser privados.
     */
    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    constructor(
        $stateProvider: ng.ui.IStateProvider, 
        $urlRouterProvider: ng.ui.IUrlRouterProvider, 
        $locationProvider: ng.ILocationProvider
    ) {
        
        $stateProvider.state('login', 
        {
            url: '/', 
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }
}

class LoginController {
    private usuario: IUsuario[];
    
    /**
     * @constructor Constructor e injeccción de servicios a la clase (al objeto modular)
     * @param IloginService 
     */
    static $inject = ['LoginService'];
    constructor(private loginService: ILoginService) {
        
    }
    
    /**
     * @description Funciona para traer la lista de usuarios
     */
    obtenerUsuarios() {
        this.loginService.listaUsuarios()
        .then((res) => {
            this.usuario = res;
        })
    }
}

/**
 * @description Interface que establece el tipado del objeto Usuario
 */
interface IUsuario
{
    usuario: string;
    contrasena: string;
    rol?: boolean; // Propiedad opcional determinada por "?"
}

/**
 * @description Interface del servicio LoginService
 */
interface ILoginService {
    listaUsuarios(): ng.IPromise<IUsuario[]>
}

class LoginService implements ILoginService {
    
    /**
     * @constructor Contructor de la clase e inyector de servicios de Angular
     * @param $http servicio de conexión tipo ajax con el backend.
     */
    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService) {
        
    }
    
    /**
     * @description Función del servicio que obtiene lista de usuarios
     * @returns  vector de Usuarios[]
     */
    listaUsuarios(): ng.IPromise<IUsuario[]> {
        return this.$http.get('/listaUsuarios')
            .then((respuesta: ng.IHttpPromiseCallbackArg<IUsuario[]>) => {
                return respuesta.data;
            }
        )
    }
}

class MyApp {
    /**
     * @constructor Clase que lanza el app de angular.
     * @param nombreApp string nombre del app definido en el tag ng-app="<nombreApp>"
     */
    constructor(private nombreApp: string) {
        let app = angular.module(this.nombreApp, ['ui.router']);
        app.config(Config);
        app.service('LoginService', LoginService);
        app.controller('LoginController', LoginController);
    }
}

// Aunque no existe un "main" o "runner" creamos un nuevo objeto de la clase MyApp anónimo
new MyApp('myApp');
