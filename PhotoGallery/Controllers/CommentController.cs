using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.BusinessLogicLayer.Interfaces;
using PhotoGallery.DataAccessLayer.Entities;
using PhotoGallery.Models;

namespace PhotoGallery.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class CommentController : BaseController
    {
        private readonly ICommentService _commentService;
        private readonly IMapper _mapper;

        public CommentController(
            ICommentService commentService,
            IMapper mapper
            )
        {
            _commentService = commentService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Add([FromBody]AddCommentViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Album properties are not valid.");
            }

            if (!IsCurrentUser(viewModel.UserId))
            {
                return BadRequest("User credentials are not valid.");
            }

            var comment = GetMappedComment(viewModel);

            _commentService.Add(comment);

            return Ok();
        }

        public Comment GetMappedComment(AddCommentViewModel viewModel)
        {
            var comment = _mapper.Map<Comment>(viewModel);
            comment.CreationDate = DateTime.Now;

            return comment;
        }
    }
}