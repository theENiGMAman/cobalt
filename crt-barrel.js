// crt-barrel.js — Injects CRT barrel distortion filter
(function() {
  if (document.getElementById("SphereMapTest")) return; // avoid duplicates

  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("style", "display:none;");
  
  const filter = document.createElementNS(svgNS, "filter");
  filter.setAttribute("id", "SphereMapTest");
  filter.setAttribute("filterUnits", "objectBoundingBox");
  filter.setAttribute("x", "-0.45");
  filter.setAttribute("y", "-1.29");
  filter.setAttribute("width", "1.6");
  filter.setAttribute("height", "3.5");

  const feImage = document.createElementNS(svgNS, "feImage");
  feImage.setAttribute("result", "Map");
  feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", "https://chafalleiro.github.io/retromator/img/sphere_wide_1.png");

  const feDisplacement = document.createElementNS(svgNS, "feDisplacementMap");
  feDisplacement.setAttribute("in", "SourceGraphic");
  feDisplacement.setAttribute("in2", "Map");
  feDisplacement.setAttribute("scale", "100"); // strength of curve
  feDisplacement.setAttribute("xChannelSelector", "R");
  feDisplacement.setAttribute("yChannelSelector", "G");

  filter.appendChild(feImage);
  filter.appendChild(feDisplacement);
  svg.appendChild(filter);

  document.body.insertBefore(svg, document.body.firstChild);
})();
