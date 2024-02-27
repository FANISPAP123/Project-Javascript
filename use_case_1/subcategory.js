window.addEventListener("load", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("sid");
    console.log(subId);
    
    const adId = urlParams.get("id");
    console.log(adId)
  
    fetch(`https://wiki-ads.onrender.com/ads?subcategory=${subId}`)
      .then(response => response.json())
      .then(ads => {
        const selectedAd = ads.find(ad => ad.id == adId);
  
        // Χρησιμοποιήσε το Handlebars για να συνθέσετε το HTML με βάση το template
        const templateSource = document.getElementById("ad-template").innerHTML;
        const template = Handlebars.compile(templateSource);
        const adHtml = template(selectedAd);
  
        // Εμφανίσε το HTML στο κατάλληλο στοιχείο στη σελίδα
        const adContainer = document.getElementById("ads-container");
        adContainer.innerHTML = adHtml;
      })
      .catch(error => console.error(error));
  });
  Handlebars.registerHelper('splitFeatures', function(features) {
    if (features) {
      return features.split(';').map(feature => feature.trim());
    } else {
      return [];
    }
  });
  Handlebars.registerHelper('splitFeatureValue', function(feature) {
    if (feature) {
      return feature.split(':').map(value => value.trim());
    } else {
      return [];
    }
  });
  