function getParam(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function convertToSlug(text) {
  return text
    .toLowerCase() // Step 1: Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Step 2: Remove special characters (except hyphen)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, "") // Remove leading and trailing hyphens
    .concat("-tab"); // Step 3: Add '-tab' at the end
}

var Webflow = Webflow || [];
Webflow.push(function () {
  var tabName = getParam("tab");

  if (tabName) {
    $("." + tabName).triggerHandler("click");
  }
});

const tabsContainer = document.querySelector('[hndrx-tab-queries="tabs"] div:first-child');
const tabs = tabsContainer.querySelectorAll("a");

console.log(tabs);

tabs.forEach(function (tab) {
  const linkText = tab.querySelector("div:first-child");

  console.log(linkText);

  tab.addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the default behavior of the link

    const tabQuery = convertToSlug(linkText.textContent);

    // Add the tab name as a query parameter to the URL without refreshing the page
    history.pushState(null, null, window.location.pathname + "?tab=" + tabQuery);
  });
});
