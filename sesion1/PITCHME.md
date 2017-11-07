# AngularJS
<span style="color:gray">Controladores y Vistas<span/>

---

## Objetivos

1. Entender que es AngularJS
2. Arquitectura de AngularJS
3. MVW
4. Data Binding
5. Controllers
6. Templates
7. Scope en AngularJS
8. Digest Cycle
9. Hola Mundo AngularJS!

---

## Qué es AngularJS?

* Framework MVW Javascript
* Componentes Reutilizables
* Testeable
* Inyección de dependencias
* Validación de formularios
* Data Binding

---

## Arquitectura AngularJS

<img src="https://github.com/Nectia/taller-angularjs/blob/master/sesion1/assets/arquitectura.png?raw=true" width="500">

---

## Data Binding

<p style="font-size: 30px">
<img src="https://github.com/Nectia/taller-angularjs/blob/master/sesion1/assets/two-way-binding.png?raw=true" align="right" width="400">

Data-binding es una forma automática de actualizar la vista cuando ocurre un cambio en el modelo, y viceversa, actualizar el modelo cuando hay un cambio en la vista, por ejemplo, escribir en un input.
</p>

---

## Controllers

<p style="font-size: 30px">
* Son objetos que permiten enlazar el modelo con la vista, y controlar los eventos generados
* Se enlazan mediante la directiva ng-controller
* Se les pueden inyectar constantes o servicios
* Se deben utilizar para establecer el comportamiento inicial del scope y agregar comportamiento al mismo (funciones)
* No se debe usar para:
	* Manipular DOM - Utilizar directivas
	* Formatear un input - Utilizar directivas de formularios
	* Filtrar una salida - Utilizar filtros
	* Compartir estado con otros controladores - Utilizar servicios
	* Controlar el ciclo de vida de otros componentes, por ejemplo crear instancias de servicios
</p>

```javascript
var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);
```

---

## Templates

<p style="font-size: 30px">
Un template es código HTML que contiene elementos especificos de AngularJS y su sintaxis. AngularJS combina los templates con la información que se encuentra en el modelo y renderiza esto dinamicamente.
</p>

```html
<html ng-app>
 <!-- Body tag augmented with ngController directive  -->
 <body ng-controller="MyController">
   <input ng-model="foo" value="bar">
   <!-- Button tag with ngClick directive, and
          string expression 'buttonText'
          wrapped in "{{ }}" markup -->
   <button ng-click="changeFoo()">{{buttonText}}</button>
   <script src="angular.js"></script>
 </body>
</html>
```

---

## Scope en AngularJS

<p style="font-size: 30px" >
<img src="https://github.com/Nectia/taller-angularjs/blob/master/sesion1/assets/scope.png?raw=true" align="right" width="400">

El scope es un objeto que hace referencia al modelo, los scopes estan organizados de forma geragica similar a la estructura del DOM, los scopes pueden escuchar eventos y propagar los mismos
</p>

---

## Digest Cycle

<img src="https://github.com/Nectia/taller-angularjs/blob/master/sesion1/assets/digestcycle.png?raw=true">

## Servicios

<p style="font-size: 30px">
Un servicio es un objeto JavaScript Singleton que nos permite obtener información. Estos objetos tienen métodos que sirven para mantener los datos en el ciclo de vida de la aplicación y se comunican atravez de los controladores de una manera consistente.
</p>

---

## Constants

<p style="font-size: 20px">
Constant sirve para almacenar valores simples de cualquier tipo que no deben cambiar, NO podemos inyectar dependencias (DI) en su definición, y tampoco es configurable, pero SI puede inyectarse en funciones de configuración.

Un ejemplo de definición de constante sería el siguiente:
</p>

```javascript
myApp.constant('SERVERS',{
	DEVELOPMENT: "http://localhost:8080/app", 
	PRODUCTION:"http://myDomain.com/app"
});
```
<p style="font-size: 20px">
Y se utilizaría (tanto en config, como en run, controller, service, etc. ) del siguiente modo:
</p>

```javascript
myApp.config(['SERVERS', function(SERVERS){
    console.log(SERVERS.PRODUCTION);
}]);
```

---

## Value

<p style="font-size: 20px">
Value nos permite definir objetos simples y primitivas que se pueden inyectar únicamente durante la fase de ejecución. NO podemos inyectar dependencias (DI) en su definición ni es configurable.

Algunos ejemplos serían los siguientes:
</p>

```javascript
myApp.value('randomize',function(){ 
    return Math.floor(Math.random()*10000);
})
myApp.value('token','a1234567890');
myApp.value('User',{'id': 'someId'})
```

<p style="font-size: 20px">
Se utilizarían en la fase de ejecución (run, controller, service, etc. ) del siguiente modo:
</p>

```javascript
myApp.run(['randomize', 'User', function(randomize, User){
    var num = randomize();
    User.id = num;
}]);
```

---

## Service

<p style="font-size: 15px">
Un servicio es una función constructor que define el servicio. Este servicio se puede inyectar únicamente durante la fase de ejecución. No obstante, SI podemos inyectar dependencias (DI) en su definición, aunque no es configurable.

Internamente, Angular utiliza el método new sobre este constructor a la hora de instanciar el servicio, por lo que podemos añadirle propiedades con this. Ese objeto this es exactamente lo que nos devuelve el servicio.

Veamos un ejemplo de definición de servicio, donde inyectamos una dependencia (el value token del punto anterior):
</p>

```javascript
myApp.service('AuthBearer', ['token', function(token) {
    this.authValue = "bearer " + token;
}]);
```

<p style="font-size: 15px">
Y se utilizaría en fase de ejecución (run, controller, service, etc. ) del siguiente modo:
</p>

```javascript
myApp.run(['AuthBearer', function(AuthBearer){
    console.log(AuthBearer.authValue);
}]);
```

---

## Factory

<p style="font-size: 15px">
Una factoría es un caso más genérico de service, más enfocado a la inicialización del servicio dado que no devuelve el constructor sino el objeto en sí mismo. Como en el servicio, se puede inyectar únicamente durante la fase de ejecución, y SI podemos inyectar dependencias (DI) en su definición, aunque no es configurable.

Un ejemplo de definición sería el siguiente:
</p>

```javascript
myApp.factory('apiToken', ['$window', 'clientId', function apiTokenFactory($window, clientId) {
  var encrypt = function(data1, data2) {
    // NSA-proof encryption algorithm:
    return (data1 + ':' + data2).toUpperCase();
  };
  var secret = $window.localStorage.getItem('myApp.secret');
  var apiToken = encrypt(clientId, secret);

  return apiToken;
}]);
```

<p style="font-size: 15px">
Y lo inyectaríamos como un servicio:
</p>

```javascript
myApp.run(['apiToken', function(apiToken){
    console.log(apiToken);
}])
```

---

## Provider

<p style="font-size: 15px">
El provider es el caso más genérico de servicio, que además de generar un servicio inyectable durante la fase de ejecución e inyectar dependencias (DI) en su definición, proporciona una API para la configuración del servicio antes de que se inicie la aplicación.

Un provider se definiría de la siguiente forma:
</p>

```javascript
myApp.provider('logger', function(){
  var logToConsole = false;
  this.enableConsole = function(flag){ logToConsole = flag; };
  this.$get = function(){
    return { 
		debug: function(msg){  if(logToConsole){ console.log(msg);} }
    };
  };
})
```

<p style="font-size: 15px">
Donde los métodos de this conforman la API de configuración, y el método this.$get equivale a una factoría.

Para configurar el servicio logger, tendríamos que usar su API en la fase de configuración, inyectando el loggerProvider:
</p>

```javascript
myApp.config(['loggerProvider', function(loggerProvider){
  loggerProvider.enableConsole(true);
}])
```

<p style="font-size: 15px">
Luego en la fase de ejecución, utilizaríamos el servicio logger del modo habitual
</p>

---

## Ng-Repeat

Sintaxis

```javascript
<div ng-repeat="item in items track by $index">
  {{n}}
</div>
```

```javascript
<div ng-repeat="model in collection track by model.id">
  {{model.name}}
</div>
```

---

## Ng-If

Sintaxis

```javascript
<ANY
  ng-if="expression">
...
</ANY>
```

---

## Ng-Click

Sintaxis

```javascript
<button ng-click="count = count + 1" ng-init="count=0">
  Increment
</button>
<span>
  count: {{count}}
</span>
```
