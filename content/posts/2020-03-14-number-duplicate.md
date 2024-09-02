---
layout: post
title:  "Number Duplicate Checker"
date:   2020-03-14 14:58:11 +1807
---

This exercise is about checking which numbers are recurring in an array of fixed range that are filled with integers from a random number generator.

Although using Collections module would make this easier, the challenge is to do this without. The first step is to have a method for random number generator, therefore that will be the first function you see, randomNumberGen(). randomNumberGen() takes in two integers to determine the range of numbers generated. Then findRecurring() is the next function which as the name suggests will find the recurring numbers in the array.

Next, it is time to execute and use both functions. randomNumberGen() will generate the numbers which will be stored into an array and sort them. Then, findRecurring() will run through all the numbers in each array and store each one of them into a dictionary/hashmap with a value of one for the first time, then checked if the number exists the next time it runs into the same number, if it is the same, store into duplicate array, until the whole array if finished.

A note for this project is that this did not account for 1 till n integer option.

{% highlight ruby %}
import random
import time

def randomNumberGen(x, y):
	return random.randint(x,y)

# finding the duplicated numbers in the array
def findRecurring(arr):
	seen={}
	dupes=[]
	for x in array:
		if x not in seen:
			seen[x] = 1
		else:
			if seen[x]==1:
				dupes.append(x)
			seen[x]+=1
	return dupes

# generate random numbers and storing them in a sorted array
array=[]
for x in range(0, 10):
	array.append(randomNumberGen(0,10))
	array.sort()
print("array: ", array)

# loop through the whole array to find the recurring integers and print them out
i = findRecurring(array)
print("recurring numbers are: ", i)
{% endhighlight %}

Example Output:
{% highlight ruby %}
array:  [0, 0, 1, 1, 5, 7, 7, 8, 8, 9]
recurring numbers are:  [0, 1, 7, 8]
{% endhighlight %}