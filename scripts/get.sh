#!/usr/bin/env bash
folder=~/workspace/assets/amcharts
url="https://s3.amazonaws.com/amcharts-downloads/3.21/amcharts_3.21.7.free.zip"
cwd=$(pwd)
if [ -d $folder ]; then rm -rf $folder; fi
(
    cd ~/workspace/assets
    wget -O amcharts.zip $url
    unzip -q amcharts.zip 'amcharts/*' -d amcharts
    rm ./amcharts.zip
    cd amcharts
    if [ -f $cwd/index.html ]; then cp $cwd/index.html ./index.html; fi
)
