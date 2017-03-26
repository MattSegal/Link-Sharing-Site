from flask import render_template, redirect
from . import bp

@bp.route('/',methods=['GET'])
def  index():
    #return render_template('links.html')
    # Redirect to new links url
    return redirect(
        "http://mattslinks.xyz",
        code=301 # Permanently moved
    )