#!/usr/bin/env python3

import pathlib,os,shutil,datetime



homePath = str(pathlib.Path.home())
OutputZip = os.path.join(homePath,'Desktop','scihelper.zip')
projectDir = os.path.dirname(os.path.abspath(__file__))


dtStamp = datetime.datetime.now().strftime("_%Y%m%d_%H%M_")

shutil.make_archive(OutputZip.split('.')[0] + dtStamp , 'zip', projectDir)
