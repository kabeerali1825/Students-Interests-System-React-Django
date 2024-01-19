from django.db import models

class Users(models.Model):
    user_ID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Students(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )

    CITY_CHOICES = (
        ('Lahore', 'Lahore'),
        ('Islamabad', 'Islamabad'),
        ('Rawalpindi', 'Rawalpindi'),
        ('Faisalabad', 'Faisalabad'),
        ('Multan', 'Multan'),
        ('Karachi', 'Karachi'),
        ('Quetta', 'Quetta'),
        ('Peshawar', 'Peshawar'),
        ('Other', 'Other'),
    )

    INTEREST_CHOICES = (
        ('Travel', 'Travel'),
        ('Reading', 'Reading'),
        ('Writing', 'Writing'),
        ('Coding', 'Coding'),
        ('Painting', 'Painting'),
        ('Sketching', 'Sketching'),
        ('Driving', 'Driving'),
        ('Bowling', 'Bowling'),
        ('Poetry', 'Poetry'),
        ('Hoteling', 'Hoteling'),
    )

    DEPARTMENT_CHOICES = (
        ('Computer Science', 'Computer Science'),
        ('Software Engineering', 'Software Engineering'),
        ('Information Technology', 'Information Technology'),
        ('Data Science', 'Data Science'),
    )
    DEGREE_CHOICES = (
        ('Associate Degree', 'Associate Degree'),
        ('Bachelors Degree', 'Bachelors Degree'),
        ('M.Phil Degree', 'M.Phil Degree'),
        ('Post-Graduate Degree', 'Post-Graduate Degree'),
    )

    st_ID = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20)
    email = models.EmailField()
    gender = models.CharField(max_length=19, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    city = models.CharField(max_length=100, choices=CITY_CHOICES, default='Select City')
    interest = models.CharField(max_length=100, choices=INTEREST_CHOICES, default='Select Interest')
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES, default='')
    degree_title = models.CharField(max_length=100 ,choices=DEGREE_CHOICES, default='Select Degree')
    subject = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()


