import glib
import dbus
from dbus.mainloop.glib import DBusGMainLoop
import json


PUSHOVER_URL = 'https://api.pushover.net/1/messages.json'
PUSHOVER_TOKEN = ''
PUSHOVER_USER = ''


def get_notifications(bus, message):
    """
    Example of message:

    [
    0 app_name, dbus.String(u'Quassel IRC'),
    1 replaces_id, dbus.UInt32(0L),
    2 app_icon, dbus.String(u'quassel'),
    3 title, dbus.String(u'Quassel IRC'),
    4 message, dbus.String(u'<b>&lt;rochacbruno&gt;</b> Hello'),
    5 actions, dbus.Array([dbus.String(u'1'), dbus.String(u'View')],
      signature=dbus.Signature('s')),
    6 hints, dbus.Dictionary(
        {
            dbus.String(u'x-kde-eventId'):
            dbus.String(u'PrivMsg', variant_level=1),
            dbus.String(u'transient'): dbus.Boolean(True, variant_level=1),
            dbus.String(u'desktop-entry'): dbus.String(u'org.kde.quassel',
            variant_level=1), dbus.String(u'x-kde-appname'):
            dbus.String(u'quassel', variant_level=1)
        },
        signature=dbus.Signature('sv')
        ),
    7 expire_timeout, dbus.Int32(-1)
    ]
    """
    args = list(message.get_args_list())

    if len(args) > 1:
        app_title = args[0]
	#app_name = args[6]["desktop-entry"]
	notification_icon = ""
	app_name = ""

	#print(args[6])

	if "image_path" in args[6]:
		notification_icon = args[6]["image_path"]

	if "desktop-entry" in args[6]:
		app_name = args[6]["desktop-entry"]

        app_icon = args[2]
        title = args[3]
        message = args[4]

        allData = {"app_title": app_title,"app_name": app_name, "app_icon": app_icon,"notification_icon": notification_icon, "title": title,"messsage": message}

        y = json.dumps(allData)
        print(y)
        #notification_hints = args[6]
        #print("--------------------")
        #print(args[6])
           # print('Sending notification for IRC')
            #print(title, message)
            #push_over(title, message)


loop = DBusGMainLoop(set_as_default=True)
session_bus = dbus.SessionBus()
session_bus.add_match_string(
    "type='method_call',interface='org.freedesktop.Notifications',"
    "member='Notify',eavesdrop=true"
)
session_bus.add_message_filter(get_notifications)


#print('Listening for messages...')
glib.MainLoop().run()
