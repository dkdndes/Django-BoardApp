from django.db import models

# Create your models here.
class SpielfeldPosition(models.Model):
	xPos = models.CharField(max_length=10)
	yPos = models.CharField(max_length=10)	
	def __unicode__(self):
		return self.xPos + ',' + self.yPos

class Spielfigur(models.Model):
	name = models.CharField(max_length=20)
	sID = models.CharField(max_length=21)
	pos = models.ForeignKey(SpielfeldPosition)
	def __unicode__(self):
		return self.name

class SpielerPosition(models.Model):
	sid = models.CharField(max_length=21)
	x = models.CharField(max_length=10)
	y = models.CharField(max_length=10)	
	def __unicode__(self):
		return self.sid + ' - ' + self.xPos + ',' + self.yPos