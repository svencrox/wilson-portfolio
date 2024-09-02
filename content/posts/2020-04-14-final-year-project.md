---
layout: post
title:  "Final Year Project - Sound Meter"
date:   2020-04-14 11:58:11 +1807
---

The architecture for this project:
![System Architecture](/assets/system_archi.PNG)

For the sound receiving and calculating them into decibels, we will be using A-weightage for the calculation for the sound pressure level. I will be explaining bit and pieces of the code and what it does.

{% highlight ruby %}
import os, errno
import pyaudio
import spl_lib as spl
from scipy.signal import lfilter
import numpy
import time
import pika
{% endhighlight %}

Here we import the things needed like pyaudio for audio related interpolation, spl library to utilize its A-weightage on our sound sample, scipy and numpy for math, and pika for data sending affter calculating their decibels.

{% highlight ruby %}
CHUNKS = [4096, 4800]       # originally for CD quality is 4096 but if it fails then put in more
CHUNK = CHUNKS[1]
FORMAT = pyaudio.paInt16    # 16 bit
CHANNEL = 1    # 1 for mono. 2 for stereo
STATUS = "HELLO"

RATES = [44300, 48000] #mic rates
RATE = RATES[1]

NUMERATOR, DENOMINATOR = spl.A_weighting(RATE)
{% endhighlight %}

Here are the global vars which will be used and transposed to keep most of its quality

{% highlight ruby %}
credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('172.17.14.179', 5672, '/', credentials))
channel = connection.channel()
channel.queue_declare('decibel')
{% endhighlight %}

In this block of code, this is where the credentials for the connection to the server to send data from the pi. Also to declare a queue at which the calculated decibels will be going. The credentials points to the IP address of the server where data will be sent to.

{% highlight ruby %}
def get_path(base, tail, head=''):
    return os.path.join(base, tail) if head == '' else get_path(head, get_path(base, tail)[1:])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SINGLE_DECIBEL_FILE_PATH = get_path(BASE_DIR, 'decibel_data/single_decibel.txt')
MAX_DECIBEL_FILE_PATH = get_path(BASE_DIR, 'decibel_data/max_decibel.txt')
{% endhighlight %}

This block of code is to define the paths to the folders for single decibel and max decibel for comparison purposes and to be able to know of the max decibel for any usage on web side.

We then initiate pyaudio and start listening on the mic. In order to update the max decibels and to ensure that the data is meaningful we ran it with a simple algorithm.

{% highlight ruby %}
pa = pyaudio.PyAudio()

stream = pa.open(format = FORMAT,
                channels = CHANNEL,
                rate = RATE,
                input = True,
                frames_per_buffer = CHUNK)


def is_meaningful(old, new):
    return abs(old - new) > 3

def update_max_if_new_is_larger_than_max(new, max):
    print("update_max_if_new_is_larger_than_max called")
    if new > max:
        print("max observed")
        update_text(MAX_DECIBEL_FILE_PATH, 'MAX: {:.2f} dBA'.format(new))
        click('update_max_decibel')
        return new
    else:
        return max
{% endhighlight %}

Next up is the main function that will be kept running to record, interpret and send the decibels to the queue.

{% highlight ruby %}
def listen():
    old=0
    error_count=0
    min_decibel=100
    max_decibel=0
    print("Listening")
    while True:
        try:
            ## read() returns string which needs to convert into array.
            block = stream.read(CHUNK, exception_on_overflow = False)
        except IOError as e:
            error_count += 1
            print(" (%d) Error recording: %s" % (error_count, e))
        else:
            decoded_block = numpy.fromstring(block, 'Int16')
            y = lfilter(NUMERATOR, DENOMINATOR, decoded_block)
            new_decibel = 20*numpy.log10(spl.rms_flat(y))
            if is_meaningful(old, new_decibel):
                old = new_decibel
                channel.basic_publish(exchange='',
                          routing_key='decibel',
                          body=str(new_decibel))
                print('dB sent: ', str(new_decibel))
                time.sleep(2)
{% endhighlight %}

After that, if the loop is broken, the connections and mic stream will terminate properly.

{% highlight ruby %}
stream.stop_stream()
stream.close()
pa.terminate()
connection.close()
{% endhighlight %}