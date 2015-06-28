// Generated by CoffeeScript 1.9.3
(function() {
  var exec, finder, sys,
    slice = [].slice;

  sys = require('sys');

  exec = require('child_process').exec;

  finder = function() {
    var a, args, callback, command, i, j, len, running;
    command = arguments[0], args = 3 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []), callback = arguments[i++];
    running = "python2 ~/python_congress_finder/congress_finder.py " + command;
    for (j = 0, len = args.length; j < len; j++) {
      a = args[j];
      running += " \"" + a + "\"";
    }
    return exec(running, function(error, stdout, stderr) {
      if (error) {
        console.log(error);
      }
      return callback(JSON.parse(stdout));
    });
  };

  exports.finder = finder;

}).call(this);
