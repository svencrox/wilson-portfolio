---
layout: post
title:  "Final Year Project - Python SocketIO"
date:   2020-04-21 10:09:11 +1807
---
The Github link is as follows: [Python Socketio for Live Update][socketio-link]

The file we will be looking at is index.py. We will skip over the imports as it is self explanatory. We used WSGI framework for the socketio. As the client had requested for a live update dashboard. The team has decided to go with python websocket called socketio. This will run a minimal server in the background to take in data that are sent from the many pis in the library and are queued up with the help of rabbitmq to manage and create queues for each pi to send data to. It is sorted according to a number system that the client and the team had agreed on.

I have also added 3 files which are imported into this to be used. First one is csvWrite.py, this python script will allow us to write data into a csv comma-delimited file which the librarians can then use it to generate reports. Second file is latestFile.py, This is a simple python script to find the latest video file which is sent from the camera pi to run the image recognition without putting a lot of burden onto the processing power of the pi. The third file is counting.py, this script is where the image recognition with the help of openCV will be utilized and this script is adapted from an existing openCV based model, the video file will be fed through this code to get the number of students which are inside the libray.

{% highlight ruby %}
sio = socketio.Server(logger=True, async_mode=async_mode)
app = Flask(__name__)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)
app.config['SECRET_KEY'] = 'secret!'
thread = None
csv_queue_thread = None

# start a connection with localhost
credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('172.17.9.74', 5672, '/', credentials))
channel = connection.channel()

queue_names = ["decibel_one", "decibel_two", "decibel_three", "decibel_four", 
"decibel_five", "decibel_six", "decibel_seven", "decibel_eight", "decibel_nine", "hello"]
csv_queue = Queue()

# declare queue here
for queue in queue_names:
    channel.queue_declare(queue=queue)

def callback(ch, method, properties, body):
    # print('body:', body)
    # print('ch: ', ch)
    # print('method: ', method.routing_key)
    # print('properties: ', properties)
    DECIBEL_DATA = body.decode()
    ROUTING_KEY = method.routing_key
    csv_queue.put({'data': DECIBEL_DATA, 'routing': ROUTING_KEY})
    sio.emit('my response', {'data': DECIBEL_DATA, 'routing': ROUTING_KEY},
                 namespace='/test')

def callback_camera(ch, method, properties, body):
    # print('body:', body)
    # print('ch: ', ch)
    # print('method: ', method.routing_key)
    # print('properties: ', properties)
    count = 0
    print('received video of size: ' + str(len(body)))
    #open the file that is received at the file location
    with open('./videos/' + str(time.time()) + '.mp4', 'wb') as f:
        f.write(body)

    lat = latestFile.latest()
    print("latest: " + lat)
    count = pc.main("./mobilenet_ssd/MobileNetSSD_deploy.prototxt", "./mobilenet_ssd/MobileNetSSD_deploy.caffemodel",
    lat , "./output/webcam_output.avi")
    print("Total= ", count)
    csv.cameraCount(count)
    sio.emit('my camera', {'data': count, 'routing': method.routing_key},
                 namespace='/test')

def print_csv_queue():
    while True:
        csv_data = csv_queue.get()
        print('CSV data: ', csv_data)
        csv.saveToFile(csv_data)


def background_thread():
    for queue in queue_names:
        if (queue=='hello'):
            channel.basic_consume(callback_camera,queue=queue,no_ack=True)
        else:
            channel.basic_consume(callback,queue=queue,no_ack=True)
    channel.start_consuming()


@app.route('/')
def index():
    global thread
    global csv_queue_thread
    if csv_queue_thread is None:
        csv_queue_thread = _thread.start_new_thread(print_csv_queue, ())
    if thread is None:
        thread = sio.start_background_task(background_thread)
    return render_template('index.html')

@sio.on('my event', namespace='/test')
def test_message(sid, message):
    sio.emit('my response', {'data': message['data']}, room=sid,
             namespace='/test')
    # prints i'm connected
    print('my event: ' + str(message['data']))

@sio.on('connect', namespace='/test')
def test_connect(sid, environ):
    sio.emit('my response', {'data': 'Connected', 'count': 0}, room=sid,
             namespace='/test')


@sio.on('disconnect', namespace='/test')
def test_disconnect(sid):
    print('Client disconnected')


# We kick off our server
if __name__ == '__main__':
    if sio.async_mode == 'threading':
        # deploy with Werkzeug
        app.run(threaded=True)
    elif sio.async_mode == 'eventlet':
         # deploy with eventlet
        import eventlet
        import eventlet.wsgi
        eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
    elif sio.async_mode == 'gevent':
        # deploy with gevent
        from gevent import pywsgi
        try:
            from geventwebsocket.handler import WebSocketHandler
            websocket = True
        except ImportError:
            websocket = False
        if websocket:
            pywsgi.WSGIServer(('', 5000), app,
                              handler_class=WebSocketHandler).serve_forever()
        else:
            pywsgi.WSGIServer(('', 5000), app).serve_forever()
    elif sio.async_mode == 'gevent_uwsgi':
        print('Start the application through the uwsgi server. Example:')
        print('uwsgi --http :5000 --gevent 1000 --http-websockets --master '
              '--wsgi-file app.py --callable app')
    else:
        print('Unknown async_mode: ' + sio.async_mode)
{% endhighlight %}

[socketio-link]: https://github.com/svencrox/socketio-python