import time

class Timer:
    def __init__(self,name='Timer'):
        self.name = name
        self.start_times = {}
        self.start_time = 0
    def start(self,name):
        self.name = name
        self.start_times[name] = time.time()

    def check(self,name):
        check_time = time.time() - self.start_times[name]
        print "%s took\t%.2f s" % (name,check_time)

    def __enter__(self):
        self.start(self.name)

    def __exit__(self, type, value, traceback):
        self.check(self.name)

    @staticmethod
    def time_method(func):
        def wrapper(*args,**kwargs):
            with Timer(func.__name__):
                return func(*args,**kwargs)
        return wrapper
