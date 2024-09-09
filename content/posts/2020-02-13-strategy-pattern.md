---
layout: post
title:  "Strategy Pattern"
date:   2020-02-13 16:58:11 +1816
---
Strategy Pattern defines a family of algorithms and encapsulates them and makes them interchangeable(plug and play). Encapsulates and vary independently from the client that uses them.

Ex. different duck have different behaviors; encapsulated from the client.

{% highlight ruby %}
import types

class IBehavior:
  def __init__(self, func=None):
    self.name = "Strat 0"
    if func is not None:
      self.run = types.MethodType(func, self)
  def run(self):
    print(self.name)

def runBehaviorA(self):
    print(self.name)

def runBehaviorB(self):
    print(self.name)

if __name__ == "__main__":
  strat0 = IBehavior()
  strat1 = IBehavior(runBehaviorA)
  strat1.name = 'Behavior A'
  strat2 = IBehavior(runBehaviorB)
  strat2.name = 'Behavior B'
  strat0.run()
  strat1.run()
  strat2.run()
{% endhighlight %}

Output:
{% highlight ruby %}
Strat 0
Behavior A
Behavior B
{% endhighlight %}