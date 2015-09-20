from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    # url(r'', include('service.urls', namespace='service')),
    # url(r'', include('contacts.urls', namespace='contacts')),
    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^news/', include('news.urls', namespace='news')),
    # url(r'^tuning/', include('tuning.urls', namespace='tuning')),
    # url(r'^reviews/', include('reviews.urls', namespace='reviews')),
    # url(r'^auth/', include('myauth.urls', namespace='myauth')),
    # url(r'^ckeditor/', include('ckeditor.urls')),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)