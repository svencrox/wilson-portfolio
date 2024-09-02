---
layout: post
title:  "Factory Pattern"
date:   2020-02-14 16:58:11 +1818
---

An easier way to creating an object. Client will not have the logic to the code. Seperates the creation of the product from the code that uses it. Defines an interface for the creation of object and leaves the logic for the subclasses.

Ex. Creating animals using factory method

{% highlight ruby %}
class Animal(object):
  animal=""
  def intro(self):
    return self.animal

class Dog(Animal):
  animal="dog created"

class Cat(Animal):
  animal="cat created"

class Bird(Animal):
  animal="bird created"

class AnimalFactory():
  def create_animals(self, type):
    return animal_objects[type]()

animal_obj = AnimalFactory()
animal_objects={'dog':Dog, 'cat':Cat, 'bird':Bird}
for a in animal_objects:
  print(animal_obj.create_animals(a).intro())

# to understand how animal_objects[type]() works with dictionary sets 
def foo():
  return "bar"

food_objects={'laksa':foo, 'kolo':50}
print(food_objects['laksa']())
{% endhighlight %}

Output:

{% highlight ruby %}
dog created
cat created
bird created
# output for understanding
bar
{% endhighlight %}