import glib
import dbus
import sys
from dbus.mainloop.glib import DBusGMainLoop

sys.stdout.flush()

def notifications(bus, message):
    
    print ([arg for arg in message.get_args_list()])
    sys.stdout.flush()

DBusGMainLoop(set_as_default=True)

bus = dbus.SessionBus()
bus.add_match_string_non_blocking("eavesdrop=true, interface='org.freedesktop.Notifications', member='Notify'")
bus.add_message_filter(notifications)



mainloop = glib.MainLoop()
mainloop.run()
#sudo apt-get install python-dbus
#xwininfo -root -children
