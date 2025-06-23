<%@ taglib uri="http://www.isomorphic.com/isomorphic/servlet/taglib" prefix="isomorphic" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>

  <!-- 1) load core SmartClient engine + modules -->
  <script src="../isomorphic/system/modules/ISC_Core.js"></script>
  <script src="../isomorphic/system/modules/ISC_Foundation.js"></script>
  <script src="../isomorphic/system/modules/ISC_Containers.js"></script>
  <script src="../isomorphic/system/modules/ISC_Grids.js"></script>
  <script src="../isomorphic/system/modules/ISC_DataBinding.js"></script>

  <!-- 2) load theme -->
  <script src="../isomorphic/skins/Tahoe/load_skin.js"></script>

  <!-- 3) load all your DS descriptors automatically -->
  <isomorphic:loadDS ID="forecast" dataURL="../shared/data/forecastData.xml"/>
  <isomorphic:loadDS ID="pipeline" dataURL="../shared/data/pipelineData.xml"/>
  <isomorphic:loadDS ID="customer" dataURL="../shared/data/customerData.xml"/>
  <isomorphic:loadDS ID="employee" dataURL="../shared/data/employeeData.xml"/>
  <isomorphic:loadDS ID="office"   dataURL="../shared/data/officeData.xml"/>

  <!-- 4) your app code -->
  <script src="../js/salesDashboard.js"></script>

  <title>Sales Pipeline Dashboard</title>
</head>
<body style="margin:0; overflow:hidden;">
</body>
</html>
