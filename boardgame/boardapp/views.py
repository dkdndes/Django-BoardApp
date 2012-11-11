from django.shortcuts import render_to_response
from django.shortcuts import HttpResponse
from django.shortcuts import HttpResponseRedirect
from django.utils import simplejson
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from models import *

def index(request):
    return render_to_response('boardapp/index.html')

def getPositions(request):
    
    figuren = Spielfigur.objects.all()	
    figuren_json = {}
    
    for figur in figuren:
        figuren_json[figur.sID] = {'playerName' : figur.name, 'x' : figur.pos.xPos, 'y' : figur.pos.yPos}
    
    return HttpResponse(simplejson.dumps(figuren_json), mimetype="application/json")

@csrf_exempt
def savePosition(request):
	playerFigure = Spielfigur.objects.get(sID=request.POST.get('sID'))
	playerFigure.pos.xPos = request.POST.get('x')
	playerFigure.pos.yPos = request.POST.get('y')
	playerFigure.pos.save()
	playerFigure.save()		
	return HttpResponse('ok')
