def getBase64Size(b64string):
    size = (len(b64string) * 3) / 4 - b64string.count('=', -2)
    return int(size)