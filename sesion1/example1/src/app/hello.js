module.exports = {
  template: require('./hello.html'),
  controller: function ($log) {
    this.hello = 'Hola!';

    this.updateName = function () {
      $log.info('Cambiando nombre');
      this.hello = 'Hola ' + this.name + '!';
    };
  }
};
