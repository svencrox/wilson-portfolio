---
layout: post
title:  "Proxy Pattern"
date:   2020-02-14 16:58:11 +1817
---

1. A remote proxy between the client and object, a way to control access by acting like the real thing the client is interacting with. Different from adapter where it adapts one to another.
2. A virtual proxy controls access to resource that is expensive to create
3. Protection proxy, access management for users for example.

Ex.:

{% highlight ruby %}
class Subject:
  def executeMethod():
    pass

class RealSubject(Subject):
  def executeMethod():
    print("real subject running method..")

class Proxy(Subject):
  def __init__(self, subject):
    self.RealSubject = RealSubject

  def executeMethod(self):
    print("proxy running method..")
    if self.checkUserMethod():
      self.RealSubject.executeMethod()

  def checkUserMethod(self):
    print("checking for user authentication")
    return True

def clientCode(subject):
  subject.executeMethod()

if __name__ == "__main__":
  print("Client: Executing the client code with a proxy:")
  proxy = Proxy(RealSubject)
  clientCode(proxy)
{% endhighlight %}

Output:

{% highlight ruby %}
Client: Executing the client code with a proxy:
proxy running method..
checking for user authentication
real subject running method..
{% endhighlight %}