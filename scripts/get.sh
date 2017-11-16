#!/usr/bin/env bash
folder=~/workspace/assets/amcharts
url="https://s3.amazonaws.com/amcharts-downloads/3.21/amcharts_3.21.7.free.zip"
if [ -d $folder ]; then rm -rf $folder; fi
(
    cd ~/workspace/assets
    wget -O amcharts.zip $url
    unzip amcharts.zip  -d amcharts
    rm ./amcharts.zip
)
