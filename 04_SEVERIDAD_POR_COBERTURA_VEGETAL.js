// ================================================================
// SCRIPT PARA DETERMINAR SEVERIDAD POR TIPO DE COBERTURA VEGETAL
// Incendio Cuesta del Ternero 2021 - Comarca Andina, Patagonia
// ================================================================
 
// Pasos: los pasos 1 al 8 corresponden al script 01_SEVERIDAD_dNBR
// 1. Definir zona de estudio
// 2. Filtrar imágenes Sentinel-2 pre y post incendio
// 3. Máscaras de vegetación y agua
// 4. Cálculo de NBR y dNBR
// 5. Clasificación de severidad (umbrales USGS)
// 6. Visualización
// 8. Cálculo de superficies
// 9. AGREGO capa de CIEFAP (VER SCRIPT 05_RASTERIZACION_CIEFAP)
// 10. CALCULO DE SUPERFICIES POR CLASE DE SEVERIDAD Y COBERTURA VEGETAL


// ================================================================
// 9. AGREGO capa de CIEFAP
// ================================================================
 
var clasciefap = ee.Image('projects/ee-melinapaez/assets/incendio_Cuesta_Ternero_2021/ClasCobCiefap_RN_CH')

//Parametro de visualizacion para tipo de cobertura vegetal
var pvclas = {"opacity":1,"bands":["Clase"],"min":1,"max":17,"palette":["428f41","a5fb57","d2f73d",
"ff200a","4644c8","8accc6","f9620a","ffcfa7","ecef1a","ffa15e","f160ed","763164","fbbaff","ffffff","c2c2c2","9cd5ea","000000"]};

//visualizo el mapa 
Map.addLayer(clasciefap.clip(AOI), pvclas, 'Clasificación Río Negro', false)

//Puedo seleccionar por tipo de cobertura y ver en el mapa

var clSelec = 4 //elijo la categoria 4, 'Exotico-Artificial'
Map.addLayer(clasciefap.eq(clSelec).selfMask().clip(AOI), pvSel, 'Clase seleccionada', false)

//Calculo Area afectada por tipo de Cobertura Forestal
//genero una mascara con la clasificacion de severidad y selecciono la clase de cobertura vegetal que quiero analizar


// ==========================================================================================
//ARBUTAL NATIVO 
// ==========================================================================================
var arbusna = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(1)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(arbusna)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(arbusna.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Arbustal Na severidad',false)

print ('Arbustal Nativo severidad', areaFuego)

// ==========================================================================================
//CIPRES 
// ==========================================================================================

var cipres = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(2)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(cipres)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(cipres.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Cipres severidad',false)      

print ('Cipres severidad', areaFuego)

// ==========================================================================================
//COIHUE
// ==========================================================================================

var coihue = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(3)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(coihue)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })
      
Map.addLayer(coihue.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Coihue severidad',false)     
      
print ('Coihue severidad', areaFuego)

// ==========================================================================================
//EXOTICO ARTIFICIAL 
// ==========================================================================================

var exotiarti = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(4)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(exotiarti)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(exotiarti.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Exotico Artificial severidad',false)
      
print ('Exotico Artificial severidad', areaFuego)

// ==========================================================================================
//HERBACEO SUBARBUSTIVO 
// ==========================================================================================

var herbsub = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(5)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(herbsub)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(herbsub.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Herbaceo Subarbustivo severidad',false)

print ('Herbaceo Subarbustivo severidad', areaFuego)      

// ==========================================================================================      
//HUMEDALES 
// ==========================================================================================

var humedales = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(6)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(humedales)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(humedales.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Humedales severidad',false)
      
print ('Humedales severidad', areaFuego)

// ==========================================================================================
//LENGA 
// ==========================================================================================

var lenga = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(7)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(lenga)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(lenga.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Lenga severidad',false)

print ('Lenga severidad', areaFuego)

// ==========================================================================================
//MAITEN
// ==========================================================================================

var maiten = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(8)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(maiten)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(maiten.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Maiten severidad',false)

print ('Maiten severidad', areaFuego)

// ==========================================================================================
//MATORRAL MIXTO
// ==========================================================================================

var matmixto = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(9)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(matmixto)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(matmixto.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Matorral Mixto severidad',false)
      
print ('Matorral Mixto severidad', areaFuego)

// ==========================================================================================
//MIXTO
// ==========================================================================================

var mixto = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(10)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(mixto)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(mixto.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Mixto severidad',false)

print ('Mixto severidad', areaFuego)

// ==========================================================================================
//ÑIRE
// ==========================================================================================

var ñire = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(11)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(ñire)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(ñire.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Ñire severidad',false)

print ('Ñire severidad', areaFuego)

// ==========================================================================================
//ERIAL
// ==========================================================================================

var erial = NBRcat.updateMask(NBRcat.gt(4)).updateMask(clasciefap.eq(15)).selfMask()

var areaFuego = ee.Image.pixelArea().multiply(0.0001).addBands(erial)
  .reduceRegion({ reducer: ee.Reducer.sum().unweighted().group(1),
      geometry: aoi, scale:20, maxPixels: 1e10, })

Map.addLayer(erial.updateMask(NBRcat.gt(4)).selfMask(), {min:4, max: 8, palette: ["#0ae042", "#fff70b","#ffaf38","#ff641b","#a41fd6"]},'Erial  severidad',false)

print ('Erial severidad', areaFuego)


//////////////////////////////////////// LEYENDA //////////////////////////////////////////


//////////////////////LEYENDA///////////////////////////////  
var colors = ["428f41","a5fb57","d2f73d","ff200a","4644c8","8accc6","f9620a","ffcfa7","ecef1a",
"ffa15e","f160ed","763164"]
 
 
var names = ['Arbustal Nativo [1]','Cipres [2]','Coihue [3]','Exotico Artificial [4]',
'Herbacea Subarbustiva [5]', 'Humedales [6]', 'Lenga [7]', 'Maiten [8]', 'Matorral Mixto [9]',
'Mixto [10]', 'Ñire [11]', 'Erial [15]']

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Clases',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});

legend.add(legendTitle);

// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);

var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });

  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}

Map.add(legend)


 