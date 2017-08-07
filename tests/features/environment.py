from splinter import Browser

HEADLESS = False

def before_scenario(context, scenario):
    if 'browser' in scenario.tags:
        context.browser = Browser('chrome', headless=HEADLESS)

def after_scenario(context, scenario):
    if 'browser' in scenario.tags:
        context.browser.quit()
