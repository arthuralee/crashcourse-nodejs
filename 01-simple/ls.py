from os import listdir
from os import sys

if len(sys.argv) == 2:
  files = listdir(sys.argv[1])
else:
  files = listdir(".")

for file in files:
  print file