# Dannybot

Dannybot is an ancient tradition of my forebears, dating back to 90s. It used
to be a status page on [spesh.com](http://www.spesh.com/), showing where I was,
what I was up to, and how much email I was currently failing to answer.

These days, I'm a bit more inward-looking (though apparently just as
egocentric). The modern dannybot operates as a little status page for myself to
show me just how /fantastically/ I'm excelling my own personal goals. It's
rather telling how many half-written dannybots I've now Frankensteinishly
created, all sitting in their own repositories, and failing to be used.

Of course, this one will be different. It's different in that it's written in
Nodejs — or more specifically, [Electron](http://electron.atom.io/) a very
pleasant framework that lets you write desktop applications in Javascript.  

Hopefully it will also be different in that I will get far enough into it that
it will be useful for me. And perhaps for you, if you'd like to fork it and
rename it into the YOUR-NAME-HERE-bot.

# What Dannybot (is supposed to) show

## Mail

The number one reason for a dannybot is to demonstrate to me just how much
unanswered mail I have in my backlog, and how well I'm doing climbing onto the
top of that pile. 

Dannybot should extract a bunch of statistics about my current inbox, and
displays it in a hopefully visually clear style. It also notes and saves my
inbox figures, and shows those older statistics as a recent historical record.

## My Todo list

As a master of meta-procrastination, I have another pile of code that tries to
help me manage my todo.txt list. I invoke this handler using the command
<code>tnext</code> so I guess that's what we should call it.  It lives at
[https://github.com/dannyob/lifehacking](https://github.com/dannyob/lifehacking).

Tnext has an
[API](https://github.com/dannyob/lifehacking/blob/master/bin/todo.py) of sorts,
which can be used to pull out the current task I'm intending to work on. Tnext
shows that. It should also show a little bit of the wider context for my task
list, as well as offer some shortcuts for completing a task, timing a pomodoro
for the current task, and adding new todos to the sisyphean rockpile.

## Command line options

```
electron . repl
```

Will spin up a [replify](https://github.com/dshaw/replify) read–eval–print
loop running in the context of Electron's main process.  Despite what the message says, you should use 

```
rc /tmp/repl/dannybot.sock
```

... to connect to the REPL. If you don't have replify's rc installed, you can
[also use](https://github.com/dshaw/replify/blob/master/Readme.md) netcat or
socat.

## Licensing

Dannybot is GPL 3.0. See the [license file](LICENSE) for more info.

Dannybot uses [Photon](https://github.com/connors/photon), a UI toolkit for
Electron, is copyright @connors. Released under MIT. [Full
license](photon/LICENSE) for Photon.


