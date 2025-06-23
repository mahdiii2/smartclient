@echo off
setlocal

:: This script will copy the JARs required to run SmartClientWebDriver from the
:: lib directory.  To instead use Maven to pick up dependences instead, see:
::
:: https://smartclient.com/smartclient-release/isomorphic/system/reference/?id=group..mavenSupport
::
:: for SmartClient, or
::
:: https://smartclient.com/smartgwtee-release/javadoc/com/smartgwt/client/docs/MavenSupport.html
::
:: for SmartGWT

pushd "%~dp0"
copy ..\lib\commons-exec-1.3.jar .
copy ..\lib\commons-lang-2.6.jar .
copy ..\lib\commons-logging-1.2.jar .
copy ..\lib\filterbuilder.jar .
copy ..\lib\gson-2.8.4.jar .
copy ..\lib\guava-27.0-jre.jar .
copy ..\lib\hamcrest-all-1.3.jar .
copy ..\lib\htmllexer.jar .
copy ..\lib\htmlparser.jar .
copy ..\lib\httpclient-4.5.13.jar .
copy ..\lib\httpcore-4.4.14.jar .
copy ..\lib\isomorphic_webdriver.jar .
copy ..\lib\jna-4.1.0.jar .
copy ..\lib\jna-platform-4.1.0.jar .
copy ..\lib\json-20080701.jar .
copy ..\lib\junit-4.12.jar .
copy ..\lib\okhttp-3.9.1.jar .
copy ..\lib\okio-1.13.0.jar .
copy ..\lib\sax2.jar .
copy ..\lib\selenium-client-combined-3.141.59.jar .
copy ..\lib\thumbelina.jar .
popd

echo SmartClientWebDriver JARs installed
