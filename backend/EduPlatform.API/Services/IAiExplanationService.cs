using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface IAiExplanationService
{
    Task<AiExplanationResponseDto> GenerateExplanationAsync(AiExplanationDto dto);
}