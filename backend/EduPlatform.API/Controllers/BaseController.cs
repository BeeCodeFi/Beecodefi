using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatform.API.Controllers;

/// <summary>
/// Base controller providing common functionality for all API controllers.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    /// <summary>
    /// Gets the authenticated user's ID from the JWT token claims.
    /// Throws UnauthorizedAccessException if the user is not authenticated.
    /// </summary>
    /// <returns>The authenticated user's ID.</returns>
    /// <exception cref="UnauthorizedAccessException">Thrown when user is not authenticated.</exception>
    protected int GetUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (claim == null)
        {
            throw new UnauthorizedAccessException("User is not authenticated");
        }
        return int.Parse(claim);
    }

    /// <summary>
    /// Gets the authenticated user's ID from the JWT token claims if available.
    /// Returns null if the user is not authenticated.
    /// </summary>
    /// <returns>The authenticated user's ID or null if not authenticated.</returns>
    protected int? GetOptionalUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return claim != null ? int.Parse(claim) : null;
    }

    /// <summary>
    /// Gets the authenticated user's email from the JWT token claims.
    /// </summary>
    /// <returns>The authenticated user's email or null if not authenticated.</returns>
    protected string? GetUserEmail()
    {
        return User.FindFirstValue(ClaimTypes.Email);
    }

    /// <summary>
    /// Gets the authenticated user's name from the JWT token claims.
    /// </summary>
    /// <returns>The authenticated user's name or null if not authenticated.</returns>
    protected string? GetUserName()
    {
        return User.FindFirstValue(ClaimTypes.Name);
    }
}
