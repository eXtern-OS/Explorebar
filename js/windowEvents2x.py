import Xlib
import Xlib.display

disp = Xlib.display.Display()
Xroot = disp.screen().root
NET_ACTIVE_WINDOW = disp.intern_atom('_NET_ACTIVE_WINDOW')
WM_DELETE_WINDOW = disp.intern_atom('WM_DELETE_WINDOW',True)
Xroot.change_attributes(event_mask=Xlib.X.ClientMessage)
#Xroot.set_wm_protocols([WM_DELETE_WINDOW]);

#print dir(Xroot)

windows = []
active_window_id = 0

print(WM_DELETE_WINDOW)

while True:
    # loop until an event happens that we care about
    # we care about a change to which window is active
    # (NET_ACTIVE_WINDOW property changes on the root)
    # or about the currently active window changing
    # in size or position (ConfigureNotify event for
    # our window or one of its ancestors)
    event = disp.next_event()
    print(event)
    try:
        event.atom
    except AttributeError:
        print("well, it WASN'T defined after all!")
    else:
        print(event.atom)
        if (event.atom == WM_DELETE_WINDOW):
            print("window closed");

    print(event)


    if (event.type == Xlib.X.PropertyNotify and
            event.atom == NET_ACTIVE_WINDOW):
        active = disp.get_input_focus().focus
        #print(active)
        if str(active) == "<class 'Xlib.display.Window'>(":
            continue
        try:
            name = active.get_wm_class()[1]
        except TypeError:
            name = "unknown"
        except AttributeError:
            continue

        #print("lets go\n")
        #print("The active window has changed! It is now", name)
        #print(event.window)
        #print('{"type":"focus_change","id":'+str(active.id)+'}\n')
        active_window_id = active.id

        # Because an X window is not necessarily just what one thinks of
        # as a window (the window manager may add an invisible frame, and
        # so on), we record not just the active window but its ancestors
        # up to the root, and treat a ConfigureNotify on any of those
        # ancestors as meaning that the active window has been moved or resized ,event.event
        pointer = active
        windows = []
        while pointer.id != Xroot.id:
            windows.append(pointer)
            pointer = pointer.query_tree().parent
    elif event.type == Xlib.X.ConfigureNotify and event.window in windows:
        x = str(event.x)
        y = str(event.y)
        width = str(event.width)
        height = str(event.height)
        #print(event.event.id)
        #print('{"id":'+str(active_window_id)+',"type":"dimension_change",'+'"x":'+x+',"y":'+y+',"width":'+width+','+'"height":'+height+'}\n')
