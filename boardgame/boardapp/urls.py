from django.conf.urls import patterns, include, url

urlpatterns = patterns('boardapp.views',
    url(r'^$', 'index'),    
	url(r'^getPositions', 'getPositions'),
	url(r'^savePosition', 'savePosition'),
)