using Microsoft.AspNetCore.Http;
using PhotoGallery.BusinessLogicLayer.Infrastructure.Exceptions;
using System;
using System.Net;
using System.Threading.Tasks;

namespace PhotoGallery.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ExceptionHandlingMiddleware(
            RequestDelegate next
            )
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = context.Response.StatusCode;

            if (exception is CustomValidationException)
            {
                code = (int)HttpStatusCode.BadRequest;
            }

            context.Response.StatusCode = code;

            return context.Response.WriteAsync(exception.Message);
        }
    }
}
