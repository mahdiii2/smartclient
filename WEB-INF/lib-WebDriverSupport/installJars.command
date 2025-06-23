#!/usr/bin/perl
# MacOS X launcher

use FindBin;
use File::Copy;

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

@jarFiles = (
    "commons-exec-1.3.jar",
    "commons-lang-2.6.jar",
    "commons-logging-1.2.jar",
    "filterbuilder.jar",
    "gson-2.8.4.jar",
    "guava-27.0-jre.jar",
    "hamcrest-all-1.3.jar",
    "htmllexer.jar",
    "htmlparser.jar",
    "httpclient-4.5.13.jar",
    "httpcore-4.4.14.jar",
    "isomorphic_webdriver.jar",
    "jna-4.1.0.jar",
    "jna-platform-4.1.0.jar",
    "json-20080701.jar",
    "junit-4.12.jar",
    "okhttp-3.9.1.jar",
    "okio-1.13.0.jar",
    "sax2.jar",
    "selenium-client-combined-3.141.59.jar",
    "thumbelina.jar"
);


my $thisDir = $FindBin::Bin;

foreach my $jarFile (@jarFiles)
{
    copy("$thisDir/../lib/$jarFile", "$thisDir");
}

print "SmartClientWebDriver JARs installed\n";

