#!/usr/bin/env python
##
# todo_helper.py
###
"""todo_helper.py

JSON interface for todo.py

"""

__author__ = "Danny O'Brien <http://www.spesh.com/danny/>"
__copyright__ = "Copyright Danny O'Brien"
__contributors__ = None
__license__ = "GPL v3"

import sys
import todo
import json

all_commands = {}


def command(f):
    all_commands[f.__name__] = f
    return f


@command
def list():
    z = todo.DefaultTodoList().get_all_todos()
    print json.dumps([obj.__dict__ for obj in z])


@command
def current():
    z = todo.DefaultTodoList().current_todo()
    print json.dumps(z.__dict__)


def main(args=['listtodos']):
    """ Put your main command line runner here """
    if args[1] in all_commands.keys():
        all_commands[args[1]](*args[2:])

if __name__ == "__main__":
    sys.exit(main(sys.argv) or 0)
