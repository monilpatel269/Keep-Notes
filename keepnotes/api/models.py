from django.db import models

# Create your models here.

class Note(models.Model):
    body = models.TextField(max_length=400, null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body