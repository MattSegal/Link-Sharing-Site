from splinter import Browser

browser = Browser('chrome', headless=False)
browser.visit('http://localhost/')

import pdb;pdb.set_trace()

browser.quit()