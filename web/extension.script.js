setTimeout(() => {
  //open a new tab localhost:3000
  // Open a new tab
  const newTab = window.open("http://localhost:3000/screen-record", "_blank");

  // Set localStorage in the new tab
  if (newTab) {
    // Wait for the new tab to load
    newTab.onload = function () {
      // Access the localStorage object of the new tab
      const tabStorage = newTab.localStorage;

      // Set a value in the localStorage of the new tab
      tabStorage.setItem("key", "value");

      // Close the new tab (optional)
      // newTab.close();
    };
  } else {
    console.log("Unable to open a new tab.");
  }
}, 500);
