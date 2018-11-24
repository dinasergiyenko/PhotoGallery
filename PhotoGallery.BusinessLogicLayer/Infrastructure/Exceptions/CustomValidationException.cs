using System;
using System.Collections.Generic;
using System.Text;

namespace PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions
{
    public class CustomValidationException : Exception
    {
        public CustomValidationException(string message) : base(message)
        {

        }
    }
}
