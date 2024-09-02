---
layout: post
title:  "Facade Pattern"
date:   2020-02-14 16:58:11 +1815
---

Unifies and Simplifies code. Useful when there are many objects that refer to a general item. For example, a car has many objects/items in it. 

Ex. All items in the car can be simplified into a simple car class.

{% highlight ruby %}
class tyre:
  def __init__(self):
    self.tyrePressure=45

class tank:
  def __init__(self):
    self.tank=100

# facade here
class car:
  def __init__(self):
    self.tyre=tyre()
    self.tank=tank()

  def tyrePressureStatus(self):
    print("printing tyre pressure from facade: ")
    print(self.tyre.tyrePressure)

  def fuelLevel(self):
    print("printing tank from facade: ")
    print(self.tank.tank)

if __name__ == "__main__":
  car = car()
  car.fuelLevel()
  car.tyrePressureStatus()
{% endhighlight %}

Output:

{% highlight ruby %}
printing tank from facade: 
100
printing tyre pressure from facade: 
45
{% endhighlight %}