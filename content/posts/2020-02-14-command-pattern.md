---
layout: post
title:  "Command Pattern"
date:   2020-02-14 16:58:11 +1809
---

prepare for commands that will be used, even undo actions. Do and Undo actions in each function. The logic for each commands are encapsulated from the client that will be using it and the interface stays the same. This would make the interface between systems seems less (Shafeeq, 2020).

Ex. for example turning a light on and off via remote to receiver(lamp) and switching a receiver(radio) on and off uses the same commands.

{% highlight ruby %}
class lightSwitch:
  def switchOn(self):
      print("switching light on..")
  def switchOff(self):
      print("switching light off..")

class lightOn(lightSwitch):
  def __init__(self):
    self.light = lightSwitch()
  def run(self):
    self.light.switchOn()

class lightOff(lightSwitch):
  def __init__(self):
    self.light = lightSwitch()
  def run(self):
    self.light.switchOff()

if __name__ == "__main__":
  lightOn().run()
  lightOff().run()
{% endhighlight %}

Output:
{% highlight ruby %}
switching light on..
switching light off..
{% endhighlight %}