import os
import sys
import time
import subprocess
from pathlib import Path
import shutil

# Class to hold the user id and all the pictures belonging to that user
class UserData:
    def __init__(self, directory):
        self.directory = directory
        self.paths = []
        self.name = []

    def addPaths(self, paths):
        self.paths.append(paths)

    def addName(self, name):
        self.name.append(name)

# CTRL+C to stop program execution
if __name__ == "__main__":
    # Region for s3
    region = "us-west-2:"

    while True:
        # Raw data from grabbing all available user directories
        print("Grabbing user directory names...")
        rawData = subprocess.Popen(['aws', 's3', 'ls', 's3://ort-user-uploads/private/'], shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        userDir = rawData.stdout.readlines()

        userData = []

        # # Parsed data with raw user values
        for i in range(len(userDir)):
            userDir[i] = userDir[i].decode("utf-8")
            userDir[i] = userDir[i].replace(" ", "")
            userDir[i] = userDir[i].replace("/", "")
            userDir[i] = userDir[i].rstrip()
            userData.append(UserData(userDir[i][13:]))

        # Deletes old folder of pictures
        print("Deleting old files...")
        dirpath = Path("ort-user-pictures")
        if dirpath.exists() and dirpath.is_dir():
            shutil.rmtree(dirpath)

        # Creates new folder in prep for updated pictures
        for retry in range(100):
            try:
                os.mkdir(dirpath)
                break
            except PermissionError:
                print("Error making directory, retrying...")
                

        # Creates subprocesses to grab all pictures and then waits until it is all done downloading
        print("Downloading new files...")
        getpictures = []
        for i in userData:
            command = "aws s3 sync s3://ort-user-uploads/private/%s%s/ .\\ort-user-pictures\\%s\\" % (region, i.directory, i.directory)
            command = command.split(" ")
            getpictures.append(subprocess.Popen(command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE))
        [p.wait() for p in getpictures]

        # Grabs all that need to be processed
        print("Finding which images to process...")
        numOfPictures = 0
        for i in userData:
            for x in os.listdir(str(dirpath) + '\\' + i.directory):
                path = os.path.splitext(x)[0]
                last_char = path[-4:]
                if last_char !=  "-ort":
                    i.addPaths(x)
                    i.addName(path)
                    numOfPictures = numOfPictures + 1

        # Processes the pictures through image detection script
        print("Number of images detected: %s" % (numOfPictures))
        if numOfPictures != 0:
            print("Processing images...")
            for i in userData:
                processedPictures = []
                for x in range(len(i.paths)):
                    output_image = i.name[x] + "-ort.jpg"
                    input_location = ".\\%s\\%s\\%s" % (dirpath, i.directory, i.paths[x])
                    output_location = ".\\%s\\%s\\%s" % (dirpath, i.directory, output_image)

                    command = ["python", ".\\yolov3-tf2\\detect.py", "--image", input_location, "--output", output_location]
                    # process = subprocess.Popen(command, shell=True, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr) # Testing only
                    processedPictures.append(subprocess.Popen(command, shell=True))
                [p.wait() for p in processedPictures]

            # Deletes old images 
            print("Deleting old images...")
            for i in userData:
                for x in i.paths:
                    path = str(dirpath) + "\\%s\\%s" % (i.directory, x)
                    os.remove(path)

            # Uploads processed images to aws s3
            print("Uploading new images...")
            synced = []
            for i in userData:
                command = "aws s3 sync .\\ort-user-pictures\\%s\\ s3://ort-user-uploads/private/us-west-2:%s --delete" % (i.directory, i.directory)
                command = command.split(" ")
                synced.append(subprocess.Popen(command, shell=True, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr))
            [p.wait() for p in synced]

        print("Waiting 5 seconds to restart...")
        time.sleep(5)

    pass