function anError(error) {
  var errorMsg = document.createElement("div");
  errorMsg.className = "pnlm-info-box";
  var p = document.createElement("p");
  p.textContent = error;
  errorMsg.appendChild(p);
  document.getElementById("container").appendChild(errorMsg);
}

var viewer;
function parseParameters() {
  // Check for JSON configuration file
  var config = {};
  if (tour) {
    // Get JSON configuration file
    request = new XMLHttpRequest();
    request.onload = function () {
      if (request.status != 200) {
        // Display error if JSON can't be loaded
        var a = document.createElement("a");
        a.href = tour;
        a.textContent = a.href;
        anError("The file " + a.outerHTML + " could not be accessed.");
        return;
      }

      var responseMap = JSON.parse(request.responseText);

      // Set JSON file location
      if (responseMap.basePath === undefined)
        responseMap.basePath = tour.substring(0, tour.lastIndexOf("/") + 1);

      // Merge options
      for (var key in responseMap) {
        if (config.hasOwnProperty(key)) {
          continue;
        }
        config[key] = responseMap[key];
      }

      // Set title
      if ("title" in config) document.title = config.title;

      // Create viewer
      config.escapeHTML = true;
      viewer = pannellum.viewer("container", config);
    };
    request.open("GET", tour);
    request.send();
    return;
  }

  // Set title
  if ("title" in configFromURL) document.title = configFromURL.title;

  // Create viewer
  configFromURL.escapeHTML = true;
  viewer = pannellum.viewer("container", configFromURL);
}

// Display error if opened from local file
if (window.location.protocol == "file:") {
  anError(
    "Due to browser security restrictions, Pannellum can't be run " +
      "from the local filesystem; some sort of web server must be used."
  );
} else {
  // Initialize viewer
  parseParameters();
}
