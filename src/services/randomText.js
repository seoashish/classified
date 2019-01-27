const randomText = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNabcdefghijklmnO0123456789PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  };

  exports.randomText = randomText;