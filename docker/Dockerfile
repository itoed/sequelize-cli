FROM centos:6.6

RUN rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6; yum history sync >/dev/null
RUN yum update -y; yum clean all

# Required to build modules for Node.js
RUN yum groupinstall -y 'Development Tools'; yum clean all

# Nodesource nodejs package that provides node and npm
RUN curl -sL https://rpm.nodesource.com/setup | bash - ; yum clean all
RUN rpm --import /etc/pki/rpm-gpg/NODESOURCE-GPG-SIGNING-KEY-EL ; yum history sync >/dev/null
RUN yum install -y nodejs ; yum clean all

# Install global gulp
RUN npm install -g gulp
