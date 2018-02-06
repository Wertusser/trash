from trash.settings import BASE_DIR
import os
import subprocess

STATIC_SAMPLES_DIR = os.path.join(BASE_DIR, "head/static/samples")


def wav_to_mp3(sample_name):
    sample_name = sample_name[:-4]
    subprocess.call("ffmpeg -i {}.wav -acodec libmp3lame {}.mp3".format(sample_name, sample_name), shell=True)


def is_female(sample_name):
    return 'female' in sample_name


def is_male(sample_name):
    return not is_female(sample_name)


def main():
    os.chdir(STATIC_SAMPLES_DIR)
    chorus_male = filter(is_male, os.listdir(path="."))
    for item in chorus_male:
        chord = item[12:-4].upper()
        print('"{0}" : "{{% static "samples/{1}" %}}",'.format(chord, item))



if __name__ == '__main__':
    main()
