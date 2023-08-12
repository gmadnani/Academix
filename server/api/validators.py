from django.core.exceptions import ValidationError
import os

def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  
    allowed_extensions = ['.pdf', '.doc', '.docx'] 
    if not ext.lower() in allowed_extensions:
        raise ValidationError('Only PDF, DOC and DOCX files are allowed.')