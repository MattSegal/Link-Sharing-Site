from behave import given, when, then
import requests
import time


HOME = 'http://localhost'

def get_url(path):
    return HOME + path

def get_location(web_driver_el):
    selenium_el = web_driver_el._element
    loc = selenium_el.location
    return loc['x'], loc['y']

def get_size(web_driver_el):
    selenium_el = web_driver_el._element
    width = selenium_el.value_of_css_property('width').replace('px', '')
    height = selenium_el.value_of_css_property('height').replace('px', '')
    return float(width), float(height)

@given('I visit the home page')
def visit_home_page(context):
    context.browser.visit(get_url('/'))

@when('I click the sidebar open icon')
def click_sidebar_open_icon(context):
    context.browser.find_by_id('qa-sidebar-btn')[0].click()
    time.sleep(0.3)

@when('I click the sidebar close icon')
def click_sidebar_close_icon(context):
    context.browser.find_by_id('qa-sidebar-close')[0].click()
    time.sleep(0.6)

@then('the sidebar is on screen')
def sidebar_is_visible(context):
    sidebar = context.browser.find_by_id('qa-sidebar')
    x, y = get_location(sidebar)
    width, height = get_size(sidebar)
    offset = (-1) * x
    assert width > offset

@then('the sidebar is off screen')
def sidebar_is_visible(context):
    sidebar = context.browser.find_by_id('qa-sidebar')
    x, y = get_location(sidebar)
    width, height = get_size(sidebar)
    offset = (-1) * x
    assert width <= offset

@given('I visit the login page')
def visit_home_page(context):
    context.browser.visit(get_url('/login/'))

@when('I fill and submit the login form')
def fill_login_form(context):
    browser = context.browser
    browser.find_by_tag('input')[1].fill('Wei')
    browser.find_by_tag('input')[2].fill('password')
    browser.find_by_value('Submit')[0].click()

@then('I am on to the home page')
def is_on_home_page(context):
    browser = context.browser
    assert browser.status_code.is_success()
    assert browser.url == get_url('/')

@then('I am logged in')
def is_logged_in(context):
    browser = context.browser
    r = requests.get(
        get_url('/login/'), 
        cookies=browser._cookie_manager.all(),
        allow_redirects=False
    )
    assert r.status_code == 302, r.status_code
