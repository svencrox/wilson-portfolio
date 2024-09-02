---
layout: post
title:  "Singleton Pattern"
date:   2020-02-12 16:58:11 +1450
---

Singleton pattern restricts the instantiation of a class to one single instance. Helpful when you need just one object for the whole system. OR you can just declare a global variable and use it?

Ex. A situation where i would like just one duck type instead of many.

{% highlight ruby %}
class YellowDuck:
   instance = None
   def __init__(self):
      if YellowDuck.instance != None:
         print("There can only be one Yellow Duck!")
      else:
         YellowDuck.instance = self
   def getInstance():
      if YellowDuck.instance == None:
         YellowDuck()
      return YellowDuck.instance

oneduck = YellowDuck
oneduck.getInstance()
print("one: ", oneduck.getInstance())
# should return the same instance
twoduck = YellowDuck
print("two: ", twoduck.getInstance())
{% endhighlight %}

The output(notice their instances are the same):

{% highlight ruby %}
one:  <__main__.YellowDuck object at 0x7f143e94b7f0>
two:  <__main__.YellowDuck object at 0x7f143e94b7f0>
{% endhighlight %}
