from django.db import models


# Create your models here.
class Thread(models.Model):
    username = models.CharField(max_length=30, blank=True, default='Anonymous')
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    lead = models.CharField(max_length=500)
    class Meta:
        ordering = ('created',)


class Post(models.Model):
    thread_id = models.IntegerField()
    username = models.CharField(max_length=30, blank=True, default='Anonymous')
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    lead = models.CharField(max_length=500)

    class Meta:
        ordering = ('created',)
