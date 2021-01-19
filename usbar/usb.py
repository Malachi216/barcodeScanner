import sys
import usb.core
import usb.util
import libusb
# decimal vendor and product values
#dev = usb.core.find(idVendor=325, idProduct=18)
# or, uncomment the next line to search instead by the hexidecimal equivalent
dev = usb.core.find(idVendor=0x145, idProduct=0x12)
# first endpoint
interface = 0
endpoint = dev[0][(0, 0)][0]
# if the OS kernel already claimed the device, which is most likely true
# thanks to http://stackoverflow.com/questions/8218683/pyusb-cannot-set-configuration

collected = 0
attempts = 50
while True:
    try:
        data = dev.read(endpoint.bEndpointAddress, endpoint.wMaxPacketSize)
        collected += 1
        print(data)
        sys.stdout.flush()
    except usb.core.USBError as e:
        data = None
        if e.args == ('Operation timed out',):
            continue
# release the device
usb.util.release_interface(dev, interface)
# reattach the device to the OS kernel
dev.attach_kernel_driver(interface)
