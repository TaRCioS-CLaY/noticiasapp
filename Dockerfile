FROM openjdk:8-alpine

ENV GLIBC_VERSION 2.29-r0
ENV ANDROID_SDK_VERSION 4333796
ENV BUILD_TOOLS 29.0.0
ENV TARGET_SDK 28
ENV GRADLE_VERSION 5.5.1

ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV ANDROID_SDK_ROOT /opt/android-sdk-linux
ENV GRADLE_HOME /opt/gradle-${GRADLE_VERSION}

ENV PATH ${PATH}:${JAVA_HOME}/bin:${ANDROID_SDK_ROOT}/tools/bin:${ANDROID_SDK_ROOT}/platform-tools:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/build-tools:${GRADLE_HOME}/bin

RUN apk add -U --no-cache curl git npm && \
    npm i -g --unsafe-perm ionic cordova && \
    ionic --no-interactive config set -g daemon.updates false && \
    # Download and install glibc
    echo "Baixando glibc" && \
    curl -SLo /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    curl -SLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk && \
    curl -SLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk && \
    apk add --no-cache glibc-${GLIBC_VERSION}.apk glibc-bin-${GLIBC_VERSION}.apk && \
    rm -f \
        /etc/apk/keys/sgerrand.rsa.pub \
        glibc-${GLIBC_VERSION}.apk \
        glibc-bin-${GLIBC_VERSION}.apk && \
    # Download and extract Android Tools
    echo "Baixando Android Tools" && \
    curl -SLO https://dl.google.com/android/repository/sdk-tools-linux-${ANDROID_SDK_VERSION}.zip && \
    mkdir -p ${ANDROID_SDK_ROOT} && \
    unzip -d ${ANDROID_SDK_ROOT} sdk-tools-linux-${ANDROID_SDK_VERSION}.zip && \
    rm -f sdk-tools-linux-${ANDROID_SDK_VERSION}.zip && \
    # Install SDK Packages
    echo "Instalando Android Tools" && \
    mkdir -p ~/.android/ && touch ~/.android/repositories.cfg && \
    yes | ${ANDROID_SDK_ROOT}/tools/bin/sdkmanager "--licenses" && \
    ${ANDROID_SDK_ROOT}/tools/bin/sdkmanager "--update" && \
    ${ANDROID_SDK_ROOT}/tools/bin/sdkmanager "platform-tools" "extras;android;m2repository" "extras;google;m2repository" "extras;google;instantapps" && \
    ${ANDROID_SDK_ROOT}/tools/bin/sdkmanager "build-tools;${BUILD_TOOLS}" "platforms;android-${TARGET_SDK}" && \
    # Download and extract Gradle
    echo "Baixando Gradle" && \
    curl -SLO https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip && \
    mkdir -p ${GRADLE_HOME} && \
    unzip -d /opt gradle-${GRADLE_VERSION}-bin.zip && \
    rm -f gradle-${GRADLE_VERSION}-bin.zip && \
    apk del curl && \
    mkdir /ionic

WORKDIR /ionic

# Default port
EXPOSE 8100

# Ionic Lab port
EXPOSE 8200

# Live Reload port
EXPOSE 35729

# Dev Logger port
EXPOSE 53703

CMD ["ionic", "serve", "-l", "--devapp", "--address", "0.0.0.0", "--lab-host", "0.0.0.0"]
#Rodar o bash
#docker run -it -p 8100:8100 -p 8200:8200 -p 35729:35729 -p 53703:53703 -v C:\Users\darks\Documents\Estudo\Mobile\noticiasapp:/ionic ionic-alpine /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"