# cli-fs-searcher

**Recursively walk through the filesystem, searching for files and directories while optional filtering.**

# Installation
Install using npm:

``
npm i cli-fs-searcher
``

# Usage

After installation add to your .js file:

``const searcher = require('cli-fs-searcher');
 searcher();``

And them run in the terminal:

``
node yourFile.js --[PARAMETER]=[ARGUMENT]
``



| PARAMETER | required | description |
| ------ | ------ | ------ |
| DIR | required | base lookup directory |
| PATTERN | optional | regular expression to test file/directory name |
| MIN-SIZE | optional | minimum file size [B\|K\|M\|G], should be skipped for directories |
| MAX-SIZE | optional | maximum file size [B\|K\|M\|G], should be skipped for directories |
| TYPE | optional | [D\|F] D - directory, F - file |


(B - bytes, K - kilobytes, M - megabytes, G - gigabytes)

!!! Parameters order is not strict! Any order should work!!!

# Example

``
node index.js --PATTERN=.txt --MIN-SIZE=40B --MAX-SIZE=40K --TYPE=F --DIR=/home/rostislav/Downloads
``

# License and Copyright
 
 This software is released under the terms of the [ISC license](https://github.com/yemelyanow-ross/cli-fs-searcher/blob/master/LICENSE.md).