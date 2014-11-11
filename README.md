SAVI Assignment 5
=================
Create a leaflet-based web map that incorporates data from an external source that you've prepped for web mapping. Include a short write-up for the assignment somewhere in the site (popup window, about box, etc) explaining your data source, how you prepared the data, methodology for mapping, etc.

Data source:
------------
New York State Ecozones / Ecological Regions, after Will et al. (1982) and Dickinson (1983)
Published by New York State DEC
July 3rd 2008
http://gis.ny.gov/gisdata/inventories/details.cfm?dsid=1131&nysgis=

Data prep:
----------
1. Downloaded KML files from NYS GIS Clearinghouse
2. Used geojson.io to convert to geoJSON format

(first downloaded SHP file and tried converting using QGIS, which did not work b/c lat/longs were getting decimals dropped for some reason.  Also required an add'l step of reprojecting the data - bad)


Mapping:
--------
- features were labeled by adding the plug-in Leaflet.lable 
- may have been possible to use instead L.DivIcon and no library