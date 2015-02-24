#!/bin/bash

set -ex

# Find the UID and GID of the workdir
gid=$(stat -c %g $SRC_DIR)
uid=$(stat -c %u $SRC_DIR)

# Group needs to be created unless in boot2docker
getent group $gid > /dev/null || groupadd -g $gid developer

# User 'developer' needs to be created
useradd -c "Developer" -u $uid -g $gid -G wheel developer

cmd="$@"

# Use bashrc file
cp /data/docker/bashrc /home/developer/.bashrc
chown $gid:$uid /home/developer/.bashrc

# Setup MySQL for testing
#mysqld_safe &
#echo 'Waiting for mysql to start'
#sleep 5
#mysql -e 'CREATE DATABASE sequelize_test'
#echo 'Created sequelize_test database'

# Start an interactive bash session
if [ -z "$cmd"  ]; then
    exec su - developer
fi

# Or execute command if given
su - developer <<EOM
    exec $cmd
EOM
