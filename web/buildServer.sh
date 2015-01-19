#!/bin/bash
echo "deleting last build"
rm -rf /tmp/webBuild

echo "copying directory"
cp -r ~/Google\ Drive/Dev/portfolio/web /tmp/webBuild

echo "removing unnecessary files"
rm /tmp/webBuild/buildServer.sh
rm -rf /tmp/webBuild/__pycashe__
rm /tmp/webBuild/*.pyc
rm -r /tmp/webBuild/serverSpecific
rm -f /tmp/webBuild/serverBuild.zip

echo "copying in build specific files"
rsync -av ~/Google\ Drive/Dev/portfolio/web/serverSpecific/* /tmp/webBuild

echo "zipping build"
cd /tmp/webBuild
zip -r /tmp/serverBuild.zip .

echo "moving zip to directory"
mv /tmp/serverBuild.zip ~/Google\ Drive/Dev/portfolio/web/serverBuild.zip

echo "completed"