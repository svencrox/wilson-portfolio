---
layout: post
title:  "Observer Pattern"
date:   2020-02-13 16:58:11 +1816
---
If there is a change from the observable/subject, the changes will be pushed automatically to the subscribers/observers. A one to many dependency.

Ex. An IoT project, I would like to have my sensor send me updates on its data.

{% highlight ruby %}
class IObservable:
  def attach(self, obv):
    #attach the observers
    pass
  def remove(self, obv):
    #removes observer
    pass
  def notify(self):
    #notifies all observers
    pass

data = 0
# initiate from observable interface with its own custom functions
class sensor(IObservable):
  def __init__(self):
    #initiate constructor from IObserverable
    print("starting data: ", data)
    self._observers=[]
    self._data = 0
  def attach(self, obv):
    #attach the observers
    self._observers.append(obv)
  def remove(self, obv):
    #removes observer
    self._observers.remove(obv)
  def notify(self):
    #notifies all observers
    for x in self._observers:
      print("Sending sensor data to all subscribed observer")
      print("Data has been changed to: ", self._data)
  def setsensordata(self, x):
    #gets sensor data
    self._data = x
    print("Data changed to: ", self._data)
    return self._data

# initiate an interface class of observer
class IObserver:
  def update():
    #updates all observers
    pass

# initiate from observer interface to create observers
class Smartphone(IObserver):
  def update(self, data):
    #whatever update func. it will do
    print("Phone data is: ", data)

class FridgeDisplay(IObserver):
  def update(self, data):
    #whatever update func. it will do
    print("Fridge data is: ", data)

if __name__ == "__main__":
  # initializations here
  pi = sensor()
  iphone = Smartphone()
  samsung_fridge = FridgeDisplay()

  # attach observers to observable
  pi.attach(iphone)
  pi.attach(samsung_fridge)

  # data update from observable; notifies all
  x = pi.setsensordata(100)
  pi.notify()
  iphone.update(x)
  samsung_fridge.update(x)
{% endhighlight %}

Output:

{% highlight ruby %}
starting data:  0
data changed to:  100
Sending sensor data to all subscribed observer
Data has been changed to:  100
Sending sensor data to all subscribed observer
Data has been changed to:  100
phone data is:  100
fridge data is:  100
{% endhighlight %}