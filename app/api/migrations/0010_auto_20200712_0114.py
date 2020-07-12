# Generated by Django 3.0.8 on 2020-07-12 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20170425_2139'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='link',
            name='tags',
        ),
        migrations.AlterField(
            model_name='link',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]
