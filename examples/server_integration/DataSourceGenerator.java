package com.isomorphic.examples;
 
import com.isomorphic.base.Reflection;
import java.util.*;
import java.io.*;
import java.math.*;
import java.beans.*;

import com.isomorphic.util.*;
import com.isomorphic.xml.XML;

public class DataSourceGenerator
{
    static public Map generateDataSourceConfig(String className)
        throws Exception
    {
        Class classObj = Reflection.classForName(className);
        Map propertyDescriptors = DataTools.getPropertyDescriptors(classObj);
        String shortName = className;
        // name dataSource after class name (without the package name)
        int lastPeriod = className.lastIndexOf('.');
        if (lastPeriod > 0) shortName = className.substring(lastPeriod+1);
        
        Map dsConfig = new HashMap();
        dsConfig.put("ID", shortName);
        List fields = new ArrayList();
        
        for (Iterator i = propertyDescriptors.keySet().iterator(); i.hasNext(); ) {
            String propertyName = (String) i.next();
            PropertyDescriptor propertyDescriptor =
                (PropertyDescriptor) propertyDescriptors.get(propertyName);
            String type = propertyDescriptor.getPropertyType().getName();
            String fieldType = null;
            if ("java.lang.String".equals(type) || "java.lang.Character".equals(type) ||
                "char".equals(type))
            {
                fieldType = "text";
            } else if ("java.lang.Boolean".equals(type) || "boolean".equals(type)) {
                fieldType = "boolean";
            } else if ("java.util.Date".equals(type)) {
                fieldType = "date";
            } else if ("java.lang.Byte".equals(type) || "byte".equals(type) ||
                       "java.lang.Short".equals(type) || "short".equals(type) ||
                       "java.lang.Integer".equals(type) || "int".equals(type) ||
                       "java.lang.Long".equals(type) || "long".equals(type) ||
                       "java.math.BigInteger".equals(type))
            {
                fieldType = "integer";
            } else if ("java.lang.Float".equals(type) || "float".equals(type) ||
                       "java.lang.Double".equals(type) || "double".equals(type) ||
                       "java.math.BigDecimal".equals(type))
            {
                fieldType = "float";
            }
            
            if (fieldType != null) {
                Map field = new HashMap();
                field.put("name", propertyName);
                field.put("type", fieldType);
                fields.add(field);
            }
        }
        
        dsConfig.put("fields", fields);
        return dsConfig;
    }
        
    static public String generateDataSource(String className)
        throws Exception
    {
        Map dsConfig = generateDataSourceConfig(className);
        StringWriter out = new StringWriter();
        out.write("<DataSource ID=\"" + dsConfig.get("ID") + "\">\n");
        out.write("<fields>\n");
        List fields = (List) dsConfig.get("fields");
        for (Iterator i = fields.iterator(); i.hasNext(); ) {
            XML.recordToXML("field", (Map) i.next(), out, true, null);
        }
        out.write("</fields>\n");
        out.write("</DataSource>");
        return out.toString();
    }

    /*
    public static void main(String[] args) throws Exception {
        System.out.println(generateDataSource("com.isomorphic.test.TypeTestBean"));
    }
    */
}

