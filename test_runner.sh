#!/bin/sh

# if JAVA_HOME is not set, try to autodetect
if [ "x$JAVA_HOME" = "x" ]; then
    if [ -x /usr/libexec/java_home ]; then #Canonical OSX mechanism
        JAVA_HOME=`/usr/libexec/java_home`
    elif [ -d /usr/lib/jvm/java ]; then #Canonical Linux mechanism
        JAVA_HOME=/usr/lib/jvm/java
    else
        # On Unix jdk1.3+ is in /usr/j2se - failing that it's in /usr/java
        if [ -d /usr/java/default ]; then
            JAVA_HOME=/usr/java/default
        elif [ -d /usr/java/latest ]; then
            JAVA_HOME=/usr/java/latest
        elif [ -d /usr/j2se ]; then
            JAVA_HOME=/usr/j2se
        elif [ -d /usr/java ]; then
            JAVA_HOME=/usr/java
        fi
    fi
    if [ "x$JAVA_HOME" = "x" ]; then    
        echo
        echo "Unable to auto-detect JAVA_HOME.  Assuming 'java' is in PATH"
        echo
    else 
        echo
        echo "Using auto-detected JAVA_HOME: $JAVA_HOME"
        echo
    fi
else
    echo
    echo "Using user-defined JAVA_HOME: $JAVA_HOME" 
    echo
fi

# disable use of high quality, but blocking /dev/random generator by requesting /dev/urandom if it exists
RANDOMGEN="";
if [ -e /dev/urandom ]; then
    RANDOMGEN="-Djava.security.egd=file:/dev/./urandom"
fi

# if JAVA_HOME is set, we use $JAVA_HOME/bin/java - otherwise just use whatever's in the PATH
JAVA=java
if [ "x$JAVA_HOME" != "x" ]; then
    export JAVA_HOME
    JAVA="$JAVA_HOME/bin/java"
else
    echo
    echo "Error: could not find a Java JDK or JRE on your system."
    echo
    echo "If you do not have Java installed, please download and install the JDK."
    echo "If you do have Java installed, please set the JAVA_HOME environment"
    echo "variable to the base directory of the JDK."
    echo
    exit 1
fi

# JDK 9,10 don't ship with EE APIs such as javax.xml.bind: must pass a special flag, but 11 onwards, removed entirely
JAVA_RUNTIME_ARGS="";
JAVA_VERSION=$($JAVA -version 2>&1 | awk -F '"' '/version/ {print $2}')
JAVA_MAJOR_VERSION=$($JAVA -version 2>&1 | awk -F '"' '/version/ {split($2, parts, "\\."); print parts[1]}')
if [[ "$JAVA_MAJOR_VERSION" = "9" ]]; then
    JAVA_RUNTIME_ARGS="--add-modules java.se.ee"
fi
if [[ "$JAVA_MAJOR_VERSION" = "10" ]]; then
    JAVA_RUNTIME_ARGS="--add-modules java.se.ee"
fi
if [[ "$JAVA_MAJOR_VERSION" -gt 15 ]]; then
    echo
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    echo "!! Java 16+ (you are using Java $JAVA_VERSION) requires special --add-opens"
    echo "!! arguments to use SmartClient Spring integration.  Automatically Adding."
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    echo
    JAVA_RUNTIME_ARGS="$JAVA_RUNTIME_ARGS --add-opens java.base/java.io=ALL-UNNAMED"
    JAVA_RUNTIME_ARGS="$JAVA_RUNTIME_ARGS --add-opens java.base/java.lang=ALL-UNNAMED"
    JAVA_RUNTIME_ARGS="$JAVA_RUNTIME_ARGS --add-opens java.base/java.lang.reflect=ALL-UNNAMED"
fi


cd `dirname ${BASH_SOURCE[0]}`

# run the tool

EXIT_CODE=5;
while [ "$EXIT_CODE" -eq "5" ]
do
    $JAVA $JAVA_RUNTIME_ARGS -Xmx192m $RANDOMGEN   -cp ./WEB-INF/classes/:./WEB-INF/lib/isomorphic_core_rpc.jar:./WEB-INF/lib/poi-4.1.2.jar:./WEB-INF/lib/commons-fileupload2-jakarta-servlet5-2.0.0-M2.jar:./WEB-INF/lib/jakarta.xml.bind-api-4.0.2.jar:./WEB-INF/lib/SparseBitSet-1.2.jar:./WEB-INF/lib/commons-lang-2.6.jar:./WEB-INF/lib/xmlbeans-3.1.0.jar:./WEB-INF/lib/groovy-jsr223-3.0.21-indy.jar:./WEB-INF/lib/log4j-api-2.17.1.jar:./WEB-INF/lib/joda-time-2.10.8.jar:./WEB-INF/lib/log4j-slf4j-impl-2.17.1.jar:./WEB-INF/lib/groovy-sql-3.0.21-indy.jar:./WEB-INF/lib/commons-vfs2-2.7.0.jar:./WEB-INF/lib/commons-codec-1.15.jar:./WEB-INF/lib/commons-pool-1.6.jar:./WEB-INF/lib/poi-ooxml-schemas-4.1.2.jar:./WEB-INF/lib/jaxb-runtime-4.0.5.jar:./WEB-INF/lib/commons-lang3-3.11.jar:./WEB-INF/lib/commons-fileupload2-core-2.0.0-M2.jar:./WEB-INF/lib/jakarta.activation-api-2.1.3.jar:./WEB-INF/lib/commons-cli-1.4.jar:./WEB-INF/lib/poi-ooxml-4.1.2.jar:./WEB-INF/lib/istack-commons-runtime-4.2.0.jar:./WEB-INF/lib/angus-mail-2.0.3.jar:./WEB-INF/lib/commons-collections4-4.4.jar:./WEB-INF/lib/velocity-engine-core-2.3.jar:./WEB-INF/lib/hibernate-validator-8.0.1.Final.jar:./WEB-INF/lib/httpclient-4.5.13.jar:./WEB-INF/lib/commons-io-2.16.1.jar:./WEB-INF/lib/httpcore-4.4.14.jar:./WEB-INF/lib/angus-core-2.0.3.jar:./WEB-INF/lib/validation-api-1.0.0.GA.jar:./WEB-INF/lib/jakarta.mail-api-2.1.3.jar:./WEB-INF/lib/jakarta.persistence-api-3.1.0.jar:./WEB-INF/lib/commons-jxpath-1.3.jar:./WEB-INF/lib/commons-collections-3.2.2.jar:./WEB-INF/lib/nashorn-core-15.4.jar:./WEB-INF/lib/smtp-2.0.3.jar:./WEB-INF/lib/slf4j-api-1.7.30.jar:./WEB-INF/lib/commons-compress-1.21.jar:./WEB-INF/lib/groovy-3.0.21-indy.jar:./WEB-INF/lib/jaxb-core-4.0.5.jar:./WEB-INF/lib/freemarker-2.3.33.jar:./WEB-INF/lib/log4j-core-2.17.1.jar:./WEB-INF/lib/commons-math3-3.6.1.jar:./WEB-INF/lib/angus-activation-2.0.2.jar:./WEB-INF/lib/ant.jar:./WEB-INF/lib/isomorphic_sql.jar:./WEB-INF/lib/hsqldb-2.7.4.jar:./WEB-INF/lib/commons-dbcp-1.4.jar:./WEB-INF/lib/HikariCP-4.0.3.jar:./WEB-INF/lib/isomorphic_hibernate.jar:./WEB-INF/lib/antlr4-runtime-4.13.2.jar:./WEB-INF/lib/spring-webmvc-6.1.15.jar:./WEB-INF/lib/spring-tx-6.1.15.jar:./WEB-INF/lib/hibernate-commons-annotations-6.0.6.Final.jar:./WEB-INF/lib/jboss-logging-3.6.1.Final.jar:./WEB-INF/lib/spring-web-6.1.15.jar:./WEB-INF/lib/spring-beans-6.1.15.jar:./WEB-INF/lib/spring-context-6.1.15.jar:./WEB-INF/lib/spring-core-6.1.15.jar:./WEB-INF/lib/spring-jdbc-6.1.15.jar:./WEB-INF/lib/jakarta.transaction-api-2.0.1.jar:./WEB-INF/lib/spring-aop-6.1.15.jar:./WEB-INF/lib/asm-9.7.jar:./WEB-INF/lib/cglib-3.3.0.jar:./WEB-INF/lib/commons-logging-1.2.jar:./WEB-INF/lib/dom4j-2.1.4.jar:./WEB-INF/lib/classmate-1.5.1.jar:./WEB-INF/lib/spring-orm-6.1.15.jar:./WEB-INF/lib/hibernate-ant-6.5.3.Final.jar:./WEB-INF/lib/javassist-3.30.2-GA.jar:./WEB-INF/lib/spring-expression-6.1.15.jar:./WEB-INF/lib/hibernate-core-6.5.3.Final.jar:./WEB-INF/lib/byte-buddy-1.15.10.jar:./WEB-INF/lib/asm-attrs.jar:./WEB-INF/lib/jandex-3.2.3.jar:./WEB-INF/lib/isomorphic_jpa.jar:./WEB-INF/lib/jakarta.ejb-api-4.0.1.jar:./WEB-INF/lib/isomorphic_js_parser.jar:./WEB-INF/lib/isomorphic_tools.jar:./WEB-INF/lib/isomorphic_assembly.jar:./WEB-INF/lib/isomorphic_compression.jar:./WEB-INF/lib/isomorphic_realtime_messaging.jar:./WEB-INF/lib/isomorphic_ai.jar:./WEB-INF/lib/isomorphic_spring.jar:./WEB-INF/lib/isomorphic_examples.jar:./WEB-INF/lib/jstl.jar:./WEB-INF/lib/jakarta-taglibs-standard-1.1.2.jar:./WEB-INF/lib/isomorphic_contentexport.jar:./WEB-INF/lib/batik-svg-dom-1.14.jar:./WEB-INF/lib/batik-dom-1.14.jar:./WEB-INF/lib/xml-apis-ext.jar:./WEB-INF/lib/batik-xml-1.14.jar:./WEB-INF/lib/batik-ext-1.14.jar:./WEB-INF/lib/jtidy-1.0.5.jar:./WEB-INF/lib/batik-i18n-1.14.jar:./WEB-INF/lib/batik-css-1.14.jar:./WEB-INF/lib/core-renderer.jar:./WEB-INF/lib/batik-constants-1.14.jar:./WEB-INF/lib/batik-gvt-1.14.jar:./WEB-INF/lib/batik-script-1.14.jar:./WEB-INF/lib/xml-apis-1.4.01.jar:./WEB-INF/lib/batik-bridge-1.14.jar:./WEB-INF/lib/sax2.jar:./WEB-INF/lib/batik-anim-1.14.jar:./WEB-INF/lib/batik-util-1.14.jar:./WEB-INF/lib/batik-awt-util-1.14.jar:./WEB-INF/lib/xmlgraphics-commons-2.6.jar:./WEB-INF/lib/batik-parser-1.14.jar:./WEB-INF/lib/iText-2.0.8.jar:./WEB-INF/lib/isomorphic_autotest.jar:./WEB-INF/lib/json-20080701.jar:./WEB-INF/lib/htmllexer.jar:./WEB-INF/lib/thumbelina.jar:./WEB-INF/lib/htmlparser.jar:./WEB-INF/lib/junit-4.12.jar:./WEB-INF/lib/jna-4.1.0.jar:./WEB-INF/lib/jna-platform-4.1.0.jar:./WEB-INF/lib/guava-27.0-jre.jar:./WEB-INF/lib/gson-2.8.4.jar:./WEB-INF/lib/hamcrest-all-1.3.jar:./WEB-INF/lib/filterbuilder.jar:./WEB-INF/lib/commons-exec-1.3.jar:./WEB-INF/lib/selenium-client-combined-3.141.59.jar:./WEB-INF/lib/okhttp-3.9.1.jar:./WEB-INF/lib/okio-1.13.0.jar:./WEB-INF/lib/isomorphic_webdriver.jar:./WEB-INF/lib/isomorphic_cdi.jar:./WEB-INF/lib/jakarta.enterprise.cdi-api-4.1.0.jar:./WEB-INF/lib/isomorphic_m2pluginextras.jar:./WEB-INF/lib/isomorphic_scheduler.jar:./WEB-INF/lib/quartz-jobs-2.5.0.jar:./WEB-INF/lib/quartz-2.5.0.jar:./WEB-INF/embeddedTomcat/* com.isomorphic.autotest.TestRunner  "$@"
    EXIT_CODE=$?;
done