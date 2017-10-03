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

---

## Hola Mundo AngularJS