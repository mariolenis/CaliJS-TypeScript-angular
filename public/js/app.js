//APP demo CaliJS
var Config = (function () {
    function Config($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }
    /**
     * @constructor Constructor de la clase Config, en la fase de configuración,
     * angular solo recibe providers, y los providers no pueden ser privados.
     */
    Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    return Config;
}());
var LoginController = (function () {
    function LoginController(loginService) {
        this.loginService = loginService;
    }
    /**
     * @description Funciona para traer la lista de usuarios
     */
    LoginController.prototype.obtenerUsuarios = function () {
        var _this = this;
        this.loginService.listaUsuarios()
            .then(function (res) {
            _this.usuario = res;
        });
    };
    /**
     * @constructor Constructor e injeccción de servicios a la clase (al objeto modular)
     * @param IloginService
     */
    LoginController.$inject = ['LoginService'];
    return LoginController;
}());
var LoginService = (function () {
    function LoginService($http) {
        this.$http = $http;
    }
    /**
     * @description Función del servicio que obtiene lista de usuarios
     * @returns  vector de Usuarios[]
     */
    LoginService.prototype.listaUsuarios = function () {
        return this.$http.get('/listaUsuarios')
            .then(function (respuesta) {
            return respuesta.data;
        });
    };
    /**
     * @constructor Contructor de la clase e inyector de servicios de Angular
     * @param $http servicio de conexión tipo ajax con el backend.
     */
    LoginService.$inject = ['$http'];
    return LoginService;
}());
var MyApp = (function () {
    /**
     * @constructor Clase que lanza el app de angular.
     * @param nombreApp string nombre del app definido en el tag ng-app="<nombreApp>"
     */
    function MyApp(nombreApp) {
        this.nombreApp = nombreApp;
        var app = angular.module(this.nombreApp, ['ui.router']);
        app.config(Config);
        app.service('LoginService', LoginService);
        app.controller('LoginController', LoginController);
    }
    return MyApp;
}());
// Aunque no existe un "main" o "runner" creamos un nuevo objeto de la clase MyApp anónimo
new MyApp('myApp');
