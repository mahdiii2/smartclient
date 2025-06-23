@echo off
setlocal
setlocal enableextensions
setlocal enabledelayedexpansion

set HAVE_JDK=0
set HAVE_JRE=0
set JAVA_IN_PATH=0
set USER_DEFINED_JAVA_HOME=0

rem ===========================================================================
rem JAVA_HOME detection
rem ===========================================================================
rem if JAVA_HOME is set in the env, use that
if defined JAVA_HOME  (
   set USER_DEFINED_JAVA_HOME=1
   goto checkJavaHome
)

rem if JAVA_HOME is not set in the current environment, try to look it up in the registry
rem ===========================================================================
rem JDK >= 9 detection: JavaHome stored under a different registry key than older releases
rem ===========================================================================
set KeyName=HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK
set Cmd=reg query "%KeyName%" /s
for /f "tokens=2*" %%i in ('%Cmd% ^| find "JavaHome"') do (
	set JAVA_HOME=%%j
	set JAVA=%%j\bin\java
)
if defined JAVA_HOME (
   set HAVE_JDK=1
   goto checkJavaHome
)

rem if JAVA_HOME is not set in the current environment, try to look it up in the registry
rem ===========================================================================
rem JDK < 9 detection
rem ===========================================================================
set KeyName=HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Development Kit
set Cmd=reg query "%KeyName%" /s
for /f "tokens=2*" %%i in ('%Cmd% ^| find "JavaHome"') do (
	set JAVA_HOME=%%j
	set JAVA=%%j\bin\java
)
if defined JAVA_HOME (
   set HAVE_JDK=1
   goto checkJavaHome
)

rem ===========================================================================
rem JRE >= 9 detection
rem ===========================================================================
set KeyName=HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK
set Cmd=reg query "%KeyName%" /s
for /f "tokens=2*" %%i in ('%Cmd% ^| find "JavaHome"') do (
	set JAVA_HOME=%%j
	set JAVA=%%j\bin\java
)
if defined JAVA_HOME (
   set HAVE_JRE=1
   goto checkJavaHome
)

rem ===========================================================================
rem JRE < 9 detection
rem ===========================================================================
set KeyName=HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Runtime Environment
set Cmd=reg query "%KeyName%" /s
for /f "tokens=2*" %%i in ('%Cmd% ^| find "JavaHome"') do (
	set JAVA_HOME=%%j
	set JAVA=%%j\bin\java
)
if defined JAVA_HOME (
   set HAVE_JRE=1
   goto checkJavaHome
)

rem ===========================================================================
rem Java path detection
rem ===========================================================================
rem as a last effort, try java in the path
for /f %%A in ("java.exe") do (
    set JAVA_BIN_DIR=%%~dp$PATH:A
    set JAVA=%%~dp$PATH:A\java
)
if defined JAVA_BIN_DIR (
   set JAVA_IN_PATH=1
   goto checkJavaHome
)

:checkJavaHome
if %USER_DEFINED_JAVA_HOME% == 1 (
    rem remove quotes around JAVA_HOME for consistency
    set JAVA_HOME=%JAVA_HOME:"=%
    echo.
    echo:Using user-defined JAVA_HOME: "!JAVA_HOME!"
    echo. 
    goto setJava
)

if %HAVE_JDK% == 1 (
    echo.
    echo:Using auto-detected JDK JAVA_HOME: "%JAVA_HOME%"
    echo.
    goto setJava
)

if %HAVE_JRE% == 1 (
    echo.
    echo:Using auto-detected JRE JAVA_HOME: "%JAVA_HOME%"
    echo.
    goto setJava
)

if %JAVA_IN_PATH% == 1 (
    echo.
    echo:Using Java installation detected in PATH variable at "%JAVA_BIN_DIR%"
    echo.
    goto setJava
)

rem if JAVA_HOME is unset, complain
if not defined JAVA_HOME (
    echo.
    echo:Error: could not find a Java JDK or JRE in your environment.
    echo.
    echo:If you do not have Java installed, please download and install the JDK.
    echo:If you do have Java installed, please set the JAVA_HOME environment
    echo:variable to the base directory of the JDK.
    echo.
    pause
    exit
)

:setJava
rem if JAVA_HOME environment var is set, look in there for the java binary - otherwise rely on the
rem PATH environment var
if not defined JAVA set JAVA=java
if defined JAVA_HOME set JAVA=%JAVA_HOME%\bin\java

%~D0 & CHDIR %~DP0

rem read in command line args
set ARGS=
:argLoop
if ""%1""=="""" goto endArgLoop
    set ARGS=%ARGS% %1
    shift
    goto argLoop
:endArgLoop

rem determine java version
for /f "tokens=3*" %%g in ('"%JAVA%" -version 2^>^&1 ^| findstr /i version') do (
    set JAVA_VERSION=%%g
)
set JAVA_VERSION=%JAVA_VERSION:"=%
set "JAVA_MAJOR_VERSION=%JAVA_VERSION:.=" &rem #%

rem JDK 9,10 don't ship with EE APIs such as javax.xml.bind: must pass a special flag, but 11 onwards, removed entirely
set JAVA_RUNTIME_ARGS=
if "%JAVA_MAJOR_VERSION%" == "9" (
    set JAVA_RUNTIME_ARGS=--add-modules=java.se.ee
)
if "%JAVA_MAJOR_VERSION%" == "10" (
    set JAVA_RUNTIME_ARGS=--add-modules=java.se.ee
)
if %JAVA_MAJOR_VERSION% GTR 15 (
    echo.
    echo:###############################################################################
    echo:## Java 16+ ^(you are using Java %JAVA_VERSION%^) requires special --add-opens
    echo:## arguments to use SmartClient Spring integration.  Automatically Adding.
    echo:###############################################################################
    echo.
    set JAVA_RUNTIME_ARGS=!JAVA_RUNTIME_ARGS! --add-opens java.base/java.io=ALL-UNNAMED
    set JAVA_RUNTIME_ARGS=!JAVA_RUNTIME_ARGS! --add-opens java.base/java.lang=ALL-UNNAMED
    set JAVA_RUNTIME_ARGS=!JAVA_RUNTIME_ARGS! --add-opens java.base/java.lang.reflect=ALL-UNNAMED
)

rem Remember (so we can restore) and set UTF8 codepage on console.  Note that you also need to set a font
rem contains UTF8 chars (most if not all TrueType fonts will work. E.g. "Lucida Console")
for /f "tokens=2 delims=:." %%x in ('chcp') do set DEFAULT_CODEPAGE=%%x
chcp 65001

rem run the tool
:execCommand
"%JAVA%" %JAVA_RUNTIME_ARGS% -Xmx192m   -cp .\WEB-INF\classes\;.\WEB-INF\lib\isomorphic_core_rpc.jar;.\WEB-INF\lib\poi-4.1.2.jar;.\WEB-INF\lib\commons-fileupload2-jakarta-servlet5-2.0.0-M2.jar;.\WEB-INF\lib\jakarta.xml.bind-api-4.0.2.jar;.\WEB-INF\lib\SparseBitSet-1.2.jar;.\WEB-INF\lib\commons-lang-2.6.jar;.\WEB-INF\lib\xmlbeans-3.1.0.jar;.\WEB-INF\lib\groovy-jsr223-3.0.21-indy.jar;.\WEB-INF\lib\log4j-api-2.17.1.jar;.\WEB-INF\lib\joda-time-2.10.8.jar;.\WEB-INF\lib\log4j-slf4j-impl-2.17.1.jar;.\WEB-INF\lib\groovy-sql-3.0.21-indy.jar;.\WEB-INF\lib\commons-vfs2-2.7.0.jar;.\WEB-INF\lib\commons-codec-1.15.jar;.\WEB-INF\lib\commons-pool-1.6.jar;.\WEB-INF\lib\poi-ooxml-schemas-4.1.2.jar;.\WEB-INF\lib\jaxb-runtime-4.0.5.jar;.\WEB-INF\lib\commons-lang3-3.11.jar;.\WEB-INF\lib\commons-fileupload2-core-2.0.0-M2.jar;.\WEB-INF\lib\jakarta.activation-api-2.1.3.jar;.\WEB-INF\lib\commons-cli-1.4.jar;.\WEB-INF\lib\poi-ooxml-4.1.2.jar;.\WEB-INF\lib\istack-commons-runtime-4.2.0.jar;.\WEB-INF\lib\angus-mail-2.0.3.jar;.\WEB-INF\lib\commons-collections4-4.4.jar;.\WEB-INF\lib\velocity-engine-core-2.3.jar;.\WEB-INF\lib\hibernate-validator-8.0.1.Final.jar;.\WEB-INF\lib\httpclient-4.5.13.jar;.\WEB-INF\lib\commons-io-2.16.1.jar;.\WEB-INF\lib\httpcore-4.4.14.jar;.\WEB-INF\lib\angus-core-2.0.3.jar;.\WEB-INF\lib\validation-api-1.0.0.GA.jar;.\WEB-INF\lib\jakarta.mail-api-2.1.3.jar;.\WEB-INF\lib\jakarta.persistence-api-3.1.0.jar;.\WEB-INF\lib\commons-jxpath-1.3.jar;.\WEB-INF\lib\commons-collections-3.2.2.jar;.\WEB-INF\lib\nashorn-core-15.4.jar;.\WEB-INF\lib\smtp-2.0.3.jar;.\WEB-INF\lib\slf4j-api-1.7.30.jar;.\WEB-INF\lib\commons-compress-1.21.jar;.\WEB-INF\lib\groovy-3.0.21-indy.jar;.\WEB-INF\lib\jaxb-core-4.0.5.jar;.\WEB-INF\lib\freemarker-2.3.33.jar;.\WEB-INF\lib\log4j-core-2.17.1.jar;.\WEB-INF\lib\commons-math3-3.6.1.jar;.\WEB-INF\lib\angus-activation-2.0.2.jar;.\WEB-INF\lib\ant.jar;.\WEB-INF\lib\isomorphic_sql.jar;.\WEB-INF\lib\hsqldb-2.7.4.jar;.\WEB-INF\lib\commons-dbcp-1.4.jar;.\WEB-INF\lib\HikariCP-4.0.3.jar;.\WEB-INF\lib\isomorphic_hibernate.jar;.\WEB-INF\lib\antlr4-runtime-4.13.2.jar;.\WEB-INF\lib\spring-webmvc-6.1.15.jar;.\WEB-INF\lib\spring-tx-6.1.15.jar;.\WEB-INF\lib\hibernate-commons-annotations-6.0.6.Final.jar;.\WEB-INF\lib\jboss-logging-3.6.1.Final.jar;.\WEB-INF\lib\spring-web-6.1.15.jar;.\WEB-INF\lib\spring-beans-6.1.15.jar;.\WEB-INF\lib\spring-context-6.1.15.jar;.\WEB-INF\lib\spring-core-6.1.15.jar;.\WEB-INF\lib\spring-jdbc-6.1.15.jar;.\WEB-INF\lib\jakarta.transaction-api-2.0.1.jar;.\WEB-INF\lib\spring-aop-6.1.15.jar;.\WEB-INF\lib\asm-9.7.jar;.\WEB-INF\lib\cglib-3.3.0.jar;.\WEB-INF\lib\commons-logging-1.2.jar;.\WEB-INF\lib\dom4j-2.1.4.jar;.\WEB-INF\lib\classmate-1.5.1.jar;.\WEB-INF\lib\spring-orm-6.1.15.jar;.\WEB-INF\lib\hibernate-ant-6.5.3.Final.jar;.\WEB-INF\lib\javassist-3.30.2-GA.jar;.\WEB-INF\lib\spring-expression-6.1.15.jar;.\WEB-INF\lib\hibernate-core-6.5.3.Final.jar;.\WEB-INF\lib\byte-buddy-1.15.10.jar;.\WEB-INF\lib\asm-attrs.jar;.\WEB-INF\lib\jandex-3.2.3.jar;.\WEB-INF\lib\isomorphic_jpa.jar;.\WEB-INF\lib\jakarta.ejb-api-4.0.1.jar;.\WEB-INF\lib\isomorphic_js_parser.jar;.\WEB-INF\lib\isomorphic_tools.jar;.\WEB-INF\lib\isomorphic_assembly.jar;.\WEB-INF\lib\isomorphic_compression.jar;.\WEB-INF\lib\isomorphic_realtime_messaging.jar;.\WEB-INF\lib\isomorphic_ai.jar;.\WEB-INF\lib\isomorphic_spring.jar;.\WEB-INF\lib\isomorphic_examples.jar;.\WEB-INF\lib\jstl.jar;.\WEB-INF\lib\jakarta-taglibs-standard-1.1.2.jar;.\WEB-INF\lib\isomorphic_contentexport.jar;.\WEB-INF\lib\batik-svg-dom-1.14.jar;.\WEB-INF\lib\batik-dom-1.14.jar;.\WEB-INF\lib\xml-apis-ext.jar;.\WEB-INF\lib\batik-xml-1.14.jar;.\WEB-INF\lib\batik-ext-1.14.jar;.\WEB-INF\lib\jtidy-1.0.5.jar;.\WEB-INF\lib\batik-i18n-1.14.jar;.\WEB-INF\lib\batik-css-1.14.jar;.\WEB-INF\lib\core-renderer.jar;.\WEB-INF\lib\batik-constants-1.14.jar;.\WEB-INF\lib\batik-gvt-1.14.jar;.\WEB-INF\lib\batik-script-1.14.jar;.\WEB-INF\lib\xml-apis-1.4.01.jar;.\WEB-INF\lib\batik-bridge-1.14.jar;.\WEB-INF\lib\sax2.jar;.\WEB-INF\lib\batik-anim-1.14.jar;.\WEB-INF\lib\batik-util-1.14.jar;.\WEB-INF\lib\batik-awt-util-1.14.jar;.\WEB-INF\lib\xmlgraphics-commons-2.6.jar;.\WEB-INF\lib\batik-parser-1.14.jar;.\WEB-INF\lib\iText-2.0.8.jar;.\WEB-INF\lib\isomorphic_autotest.jar;.\WEB-INF\lib\json-20080701.jar;.\WEB-INF\lib\htmllexer.jar;.\WEB-INF\lib\thumbelina.jar;.\WEB-INF\lib\htmlparser.jar;.\WEB-INF\lib\junit-4.12.jar;.\WEB-INF\lib\jna-4.1.0.jar;.\WEB-INF\lib\jna-platform-4.1.0.jar;.\WEB-INF\lib\guava-27.0-jre.jar;.\WEB-INF\lib\gson-2.8.4.jar;.\WEB-INF\lib\hamcrest-all-1.3.jar;.\WEB-INF\lib\filterbuilder.jar;.\WEB-INF\lib\commons-exec-1.3.jar;.\WEB-INF\lib\selenium-client-combined-3.141.59.jar;.\WEB-INF\lib\okhttp-3.9.1.jar;.\WEB-INF\lib\okio-1.13.0.jar;.\WEB-INF\lib\isomorphic_webdriver.jar;.\WEB-INF\lib\isomorphic_cdi.jar;.\WEB-INF\lib\jakarta.enterprise.cdi-api-4.1.0.jar;.\WEB-INF\lib\isomorphic_m2pluginextras.jar;.\WEB-INF\lib\isomorphic_scheduler.jar;.\WEB-INF\lib\quartz-jobs-2.5.0.jar;.\WEB-INF\lib\quartz-2.5.0.jar;.\WEB-INF\embeddedTomcat\* com.isomorphic.autotest.TestRunner  %ARGS%
if "%ERRORLEVEL%" == "5" goto execCommand

rem Restore original codepage. Technically this can fail to be called if the user
rem interrupts batch execution with Ctrl+C.  But given that these are not intended to be
rem production tools and the fact that in most cases failure to reset is innocuous, this should
rem be fine.
chcp %DEFAULT_CODEPAGE%

rem if there was an error or relevant output - allow the user to see it before the window
rem auto-closes
pause
