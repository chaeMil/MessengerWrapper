
function openUrl(url) {
  console.log(url);
  
  document.querySelector('#webview').src = url;
}

window.onload = function() {
  
  chrome.runtime.getPlatformInfo(function(info) {
    var os = info.os;
    
    var close = document.getElementById('close');
    var minimize = document.getElementById('minimize');
    var maximize = document.getElementById('maximize');
    
    close.addEventListener("click", function() {
      chrome.app.window.get('mainWindow').close();
    });
    
    minimize.addEventListener("click", function() {
      chrome.app.window.get('mainWindow').minimize();
    });
    
    maximize.addEventListener("click", function() {
      if (chrome.app.window.get('mainWindow').isMaximized()) {
        chrome.app.window.get('mainWindow').restore();
      } else {
        chrome.app.window.get('mainWindow').maximize();
      }
    });
    
    if (os == 'linux' || os == 'mac') {
      close.className += ' left';
      minimize.className += ' left';
      maximize.className += ' left';
    } else {
      close.className += ' right';
      minimize.className += ' right';
      maximize.className += ' right';
    }
  });

  var webview = document.getElementById('webview');
  
  webview.addEventListener('permissionrequest', function(e) {
    console.log('permissionrequest');
    console.dir(e);
    e.request.allow();
  });
  
};