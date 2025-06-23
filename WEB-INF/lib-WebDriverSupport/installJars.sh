#!/bin/sh

# This script will copy the JARs required to run SmartClientWebDriver from the
# lib directory.  To instead use Maven to pick up dependences instead, see:
#
# https://smartclient.com/smartclient-release/isomorphic/system/reference/?id=group..mavenSupport
#
# for SmartClient, or
#
# https://smartclient.com/smartgwtee-release/javadoc/com/smartgwt/client/docs/MavenSupport.html
#
# for SmartGWT

pushd "$(dirname "$0")"
cp ../lib/commons-exec-1.3.jar .
cp ../lib/commons-lang-2.6.jar .
cp ../lib/commons-logging-1.2.jar .
cp ../lib/filterbuilder.jar .
cp ../lib/gson-2.8.4.jar .
cp ../lib/guava-27.0-jre.jar .
cp ../lib/hamcrest-all-1.3.jar .
cp ../lib/htmllexer.jar .
cp ../lib/htmlparser.jar .
cp ../lib/httpclient-4.5.13.jar .
cp ../lib/httpcore-4.4.14.jar .
cp ../lib/isomorphic_webdriver.jar .
cp ../lib/jna-4.1.0.jar .
cp ../lib/jna-platform-4.1.0.jar .
cp ../lib/json-20080701.jar .
cp ../lib/junit-4.12.jar .
cp ../lib/okhttp-3.9.1.jar .
cp ../lib/okio-1.13.0.jar .
cp ../lib/sax2.jar .
cp ../lib/selenium-client-combined-3.141.59.jar .
cp ../lib/thumbelina.jar .
popd

echo "SmartClientWebDriver JARs installed"
