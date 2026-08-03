using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IAccountService
{
    Task<UserDto> GetProfileAsync(int userId);
    Task<UserDto> UpdateProfileAsync(int userId, UpdateProfileDto dto);
    Task ChangePasswordAsync(int userId, ChangePasswordDto dto);
    Task<UserDto> UploadAvatarAsync(int userId, AvatarUploadDto dto);
    Task DeleteAvatarAsync(int userId);
    Task ResetProgressAsync(int userId, ResetProgressDto dto);
    Task DeleteAccountAsync(int userId, string currentPassword);
}
