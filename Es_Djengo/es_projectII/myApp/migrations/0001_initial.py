# Generated by Django 5.0 on 2023-12-23 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Students',
            fields=[
                ('st_ID', models.AutoField(primary_key=True, serialize=False)),
                ('full_name', models.CharField(max_length=100)),
                ('roll_number', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=1)),
                ('date_of_birth', models.DateField()),
                ('city', models.CharField(choices=[('Lahore', 'Lahore'), ('Islamabad', 'Islamabad'), ('Rawalpindi', 'Rawalpindi'), ('Faisalabad', 'Faisalabad'), ('Multan', 'Multan'), ('Karachi', 'Karachi'), ('Quetta', 'Quetta'), ('Peshawar', 'Peshawar'), ('Other', 'Other')], default='Select City', max_length=100)),
                ('interest', models.CharField(choices=[('Travel', 'Travel'), ('Reading', 'Reading'), ('Writing', 'Writing'), ('Coding', 'Coding'), ('Painting', 'Painting'), ('Sketching', 'Sketching'), ('Driving', 'Driving'), ('Bowling', 'Bowling'), ('Poetry', 'Poetry'), ('Hoteling', 'Hoteling')], default='Select Interest', max_length=100)),
                ('department', models.CharField(choices=[('Computer Science', 'Computer Science'), ('Software Engineering', 'Software Engineering'), ('Information Technology', 'Information Technology'), ('Data Science', 'Data Science')], default='', max_length=100)),
                ('degree_title', models.CharField(choices=[('Associate Degree', 'Associate Degree'), ('Bachelors Degree', 'Bachelors Degree'), ('M.Phil Degree', 'M.Phil Degree'), ('Post-Graduate Degree', 'Post-Graduate Degree')], default='Select Degree', max_length=100)),
                ('subject', models.CharField(max_length=100)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
    ]
