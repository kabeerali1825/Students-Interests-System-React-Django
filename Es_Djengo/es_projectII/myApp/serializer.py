from rest_framework import serializers
from .models import Students,Users

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


        
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'