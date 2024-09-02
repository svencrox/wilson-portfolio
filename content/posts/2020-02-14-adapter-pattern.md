---
layout: post
title:  "Adapter Pattern"
date:   2020-02-14 16:58:11 +1807
---

Acts as a bridge between two interfaces to be able to interface with each other. For example in the case of socket and log, you cannot log from the socket but you can adapt it to be able to log() by writing a new function call write() to pass over for logging.

A situation where this is important: Why alter our well-tested code to support new interfaces when we can just implement an adapter that will translate the new interface to the well known one?

In the case of my FYP on smart monitoring systems,the calculated number from the camera needed to be adapted to that it can save the numbers as a .csv file on the receiving end. View code here: [Github link][github-link]

[github-link]: https://github.com/svencrox/socketio-python/blob/master/csvWrite.py