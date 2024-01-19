from rest_framework import generics
from rest_framework.response import Response
from .models import Students,Users
from .serializer import StudentSerializer,userSerializer
from rest_framework.decorators import api_view


class UserViewSet(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = userSerializer

class UserDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = userSerializer

api_view(['POST'])
def addUser(request):
    serializer = userSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

# Serializers
class StudentViewSet(generics.ListCreateAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentSerializer

class StudentDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentSerializer

# Views
@api_view(['GET'])
def allStudents(request):
    students = Students.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

#get based on ID
@api_view(['GET'])
def getStudent(request, pk):
    try:
        student = Students.objects.get(pk=pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Students.DoesNotExist:
        return Response(status=404)
@api_view(['POST'])
def addStudent(request):
    serializer = StudentSerializer(data=request.data)
    reqyest_data = request.data.copy()
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        print(serializer.errors)
    return Response(serializer.errors, status=400)
# from datetime import datetime

# @api_view(['POST'])
# def addStudent(request):
#     import pdb; pdb.set_trace()
    
#     # Convert date formats if necessary
#     date_fields = ['date_of_birth', 'start_date', 'end_date']
#     for field in date_fields:
#         if field in request.data:
#             try:
#                 date_obj = datetime.strptime(request.data[field], '%d/%m/%Y')
#                 request.data[field] = date_obj.strftime('%Y-%m-%d')
#             except ValueError:
#                 pass  # Handle the case where the date format doesn't match

#     serializer = StudentSerializer(data=request.data)
#     reqyest_data = request.data.copy()
    
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)
#     else:
#         print(serializer.errors)
    
#     return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delStudent(request, pk):
    try:
        student = Students.objects.get(pk=pk)
        student.delete()
        return Response(status=204)
    except Students.DoesNotExist:
        return Response(status=404)
    

@api_view(['PUT'])  # Define the HTTP method this view will respond to
def update_student(request, pk):
    try:
        student = Students.objects.get(pk=pk)
    except Students.DoesNotExist:
        return Response(f"No record found with st_ID {pk}.", status=404)

    if request.method == 'PUT':
        # Access the data from the request body
        data = request.data

        # Update the student instance with the provided data
        for field, value in data.items():
            setattr(student, field, value)
        
        student.save()

        return Response(f"Record of {student.full_name} updated successfully.")
    else:
        return Response("Invalid request method.", status=400)