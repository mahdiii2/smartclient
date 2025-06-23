//----------------------------------------------------------------------
// Isomorphic SmartClient
// Minimal Java server integration example
//
// Spring HelloWorld example
//
// Simple invocation of a spring-managed bean directly from the client via RPC DMI
//
//----------------------------------------------------------------------
package com.isomorphic.examples.spring;

public class HelloWorld {

    // set via property declaration in /WEB-INF/applicationContext.xml
    protected String responsePrefix;

    public HelloWorld() { }

    public void setResponsePrefix(String value) { responsePrefix = value; }
    public String getResponsePrefix() { return responsePrefix; }

    // DMI invokes this method, passes whatever string is input into the 
    // form on the client.  Search for 'DMI' in the SmartClient reference for an overview of
    // how DMI argument adaptation and method invocation works.
    //
    // The return value of this method is provided to the client-side callback.
    public String sayHello(String name) {
        System.out.println("########################################");
        System.out.println(name+" says Hello!");
        System.out.println("########################################");
        
        return responsePrefix+name+"!";
    }

}
