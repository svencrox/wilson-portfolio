---
layout: post
title:  "Decorator Pattern"
date:   2020-02-14 16:58:11 +1807
---

Introducing more functionality without using inheritance. Composition over inheritance.

Ex. Rather than stuffing all into one function, we should split it up(single responsibility principle) and use decorator for ease of adding more function without changing its core structure.

{% highlight ruby %}
# make_pretty is a decorator
def make_pretty(func):
  def inner():
    print("i got decorated")
    func()
  return inner

### this is equivalent to 
# def ordinary():
#   print("i'm ordinary")
# ordinary = make_pretty(ordinary)
##
@make_pretty
def ordinary():
  print("i'm ordinary")

ordinary()
{% endhighlight %}

Output:
{% highlight ruby %}
i got decorated
i'm ordinary
{% endhighlight %}